import React, { useEffect, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Newsletter modal with Supabase backend
// - Auto-opens after 5s if user hasn't subscribed or dismissed
// - Stores subscribers in Supabase database
// - Includes unsubscribe token management

export function NewsletterModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const hasSubscribed = () => localStorage.getItem("newsletter_status") === "subscribed";
  const hasDismissed = () => localStorage.getItem("newsletter_status") === "dismissed";

  useEffect(() => {
    if (hasSubscribed() || hasDismissed()) return;
    const t = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(t);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    // Mark as dismissed so it doesn’t reopen repeatedly
    if (!hasSubscribed()) localStorage.setItem("newsletter_status", "dismissed");
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const email = formData.get("email") as string;

      if (!email || !email.trim()) {
        toast({
          title: "Error",
          description: "Please enter your email address.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      console.log("Subscribing email:", email);

      const { data, error } = await supabase.functions.invoke('subscribe-newsletter', {
        body: { email: email.trim() },
      });

      if (error) {
        console.error("Subscription error:", error);
        toast({
          title: "Subscription failed",
          description: "Please try again in a moment.",
          variant: "destructive",
        });
      } else {
        localStorage.setItem("newsletter_status", "subscribed");
        toast({
          title: "Subscribed!",
          description: data.message || "You have been subscribed to our newsletter.",
        });
        form.reset();
        setOpen(false);
      }
    } catch (err) {
      console.error("Network error:", err);
      toast({
        title: "Network error",
        description: "Check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => (o ? setOpen(true) : handleClose())}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Join our newsletter</DialogTitle>
          <DialogDescription>
            Stay up to date with EOLOS news and offers.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="mt-2 space-y-3">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your email address"
            autoComplete="email"
          />
          {/* Button uses brand primary color via design system */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Subscribing…" : "Subscribe"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
