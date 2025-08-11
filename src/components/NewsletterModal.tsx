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

// Minimal newsletter modal using design system tokens
// - Auto-opens after 5s if user hasn't subscribed or dismissed
// - Submits to Formspree (update FORM_ENDPOINT if needed)
// - Uses primary brand color via Button default variant

const FORM_ENDPOINT = "https://formspree.io/f/xwpqykjn"; // TODO: replace with your actual Formspree endpoint if different

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
      const data = new FormData(form);
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        localStorage.setItem("newsletter_status", "subscribed");
        toast({
          title: "Subscribed",
          description: "You have been subscribed to our newsletter.",
        });
        form.reset();
        setOpen(false);
      } else {
        toast({
          title: "Subscription failed",
          description: "Please try again in a moment.",
        });
      }
    } catch (err) {
      toast({
        title: "Network error",
        description: "Check your connection and try again.",
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
