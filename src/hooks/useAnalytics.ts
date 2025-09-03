import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Generate a unique session ID for this browser session
const generateSessionId = (): string => {
  const stored = sessionStorage.getItem('analytics_session_id');
  if (stored) return stored;
  
  const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  sessionStorage.setItem('analytics_session_id', newSessionId);
  return newSessionId;
};

// Extract UTM parameters from URL
const getUtmParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source'),
    utm_medium: urlParams.get('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign'),
    utm_term: urlParams.get('utm_term'),
    utm_content: urlParams.get('utm_content'),
  };
};

// Track visit start/end events
const trackVisit = async (eventType: 'start' | 'end') => {
  try {
    const sessionId = generateSessionId();
    const path = window.location.pathname + window.location.search;
    const referrer = document.referrer || null;
    const utmParams = getUtmParams();
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    await supabase.functions.invoke('track-visit', {
      body: {
        sessionId,
        path,
        referrer,
        utmParams,
        userAgent,
        language,
        screenWidth,
        screenHeight,
        eventType
      }
    });
  } catch (error) {
    // Silently fail - don't interrupt user experience
    console.debug('Analytics tracking error:', error);
  }
};

export const useAnalytics = () => {
  const hasTrackedPageView = useRef(false);

  useEffect(() => {
    // Track page view start
    if (!hasTrackedPageView.current) {
      trackVisit('start');
      hasTrackedPageView.current = true;
    }

    // Track page view end on beforeunload
    const handleBeforeUnload = () => {
      trackVisit('end');
    };

    // Track page view end on visibility change (when tab becomes hidden)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        trackVisit('end');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Track end when component unmounts
      trackVisit('end');
    };
  }, []);

  // Reset tracking for new page views
  useEffect(() => {
    hasTrackedPageView.current = false;
  }, [window.location.pathname]);
};