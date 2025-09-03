import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Create Supabase client with service role key for admin access
const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { 
      sessionId,
      path, 
      referrer,
      utmParams,
      userAgent,
      language,
      screenWidth,
      screenHeight,
      eventType // 'start' or 'end'
    } = await req.json()

    console.log(`Analytics event: ${eventType} for session ${sessionId} on path ${path}`)

    // Get geolocation data from request headers
    const cfCountry = req.headers.get('cf-ipcountry') || 'Unknown'
    const cfRegion = req.headers.get('cf-region') || 'Unknown'
    const cfCity = req.headers.get('cf-ipcity') || 'Unknown'
    
    if (eventType === 'start') {
      // Create new visit record
      const { data, error } = await supabase
        .from('analytics_visits')
        .insert({
          session_id: sessionId,
          path,
          referrer,
          utm_source: utmParams?.utm_source,
          utm_medium: utmParams?.utm_medium,
          utm_campaign: utmParams?.utm_campaign,
          utm_term: utmParams?.utm_term,
          utm_content: utmParams?.utm_content,
          country: cfCountry,
          region: cfRegion,
          city: cfCity,
          user_agent: userAgent,
          language,
          screen_width: screenWidth,
          screen_height: screenHeight,
          started_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating visit record:', error)
        throw error
      }

      console.log('Visit started:', data.id)
      return new Response(JSON.stringify({ success: true, visitId: data.id }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })

    } else if (eventType === 'end') {
      // Update existing visit record with end time and duration
      const endTime = new Date()
      
      // Find the visit record by session_id and path
      const { data: existingVisit, error: findError } = await supabase
        .from('analytics_visits')
        .select('*')
        .eq('session_id', sessionId)
        .eq('path', path)
        .is('ended_at', null)
        .order('started_at', { ascending: false })
        .limit(1)
        .single()

      if (findError) {
        console.error('Error finding visit record:', findError)
        throw findError
      }

      if (existingVisit) {
        const startTime = new Date(existingVisit.started_at)
        const durationSeconds = Math.round((endTime.getTime() - startTime.getTime()) / 1000)

        const { error: updateError } = await supabase
          .from('analytics_visits')
          .update({
            ended_at: endTime.toISOString(),
            duration_seconds: durationSeconds
          })
          .eq('id', existingVisit.id)

        if (updateError) {
          console.error('Error updating visit record:', updateError)
          throw updateError
        }

        console.log(`Visit ended: ${existingVisit.id}, duration: ${durationSeconds}s`)
        return new Response(JSON.stringify({ 
          success: true, 
          visitId: existingVisit.id,
          durationSeconds 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      } else {
        console.warn('No active visit found to end')
        return new Response(JSON.stringify({ success: false, message: 'No active visit found' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }
    }

    return new Response(JSON.stringify({ success: false, message: 'Invalid event type' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error in track-visit function:', error)
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})