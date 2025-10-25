import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'invalid'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setStatus('invalid');
      setMessage('Invalid unsubscribe link. Please check your email for the correct link.');
      return;
    }

    const unsubscribe = async () => {
      try {
        console.log('Unsubscribing with token:', token);

        const { data, error } = await supabase.functions.invoke('unsubscribe-newsletter', {
          body: { token },
        });

        if (error) {
          console.error('Unsubscribe error:', error);
          setStatus('error');
          setMessage('Failed to unsubscribe. Please try again or contact support.');
        } else {
          console.log('Unsubscribe response:', data);
          setStatus('success');
          setMessage(data.message || 'You have been successfully unsubscribed from our newsletter.');
          localStorage.removeItem("newsletter_status");
        }
      } catch (err) {
        console.error('Unsubscribe error:', err);
        setStatus('error');
        setMessage('An error occurred. Please try again later.');
      }
    };

    unsubscribe();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {status === 'loading' && <Loader2 className="w-12 h-12 animate-spin text-primary" />}
            {status === 'success' && <CheckCircle2 className="w-12 h-12 text-green-600" />}
            {(status === 'error' || status === 'invalid') && <XCircle className="w-12 h-12 text-destructive" />}
          </div>
          <CardTitle className="text-2xl">
            {status === 'loading' && 'Processing...'}
            {status === 'success' && 'Unsubscribed'}
            {status === 'error' && 'Oops!'}
            {status === 'invalid' && 'Invalid Link'}
          </CardTitle>
          <CardDescription className="text-base mt-2">
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {status === 'success' && (
            <p className="text-sm text-muted-foreground">
              We're sorry to see you go. You will no longer receive emails from us.
            </p>
          )}
          <Button asChild className="w-full">
            <Link to="/">Return to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
