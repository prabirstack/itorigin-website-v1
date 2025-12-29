"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Cookie, Shield, BarChart3, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const COOKIE_CONSENT_KEY = "cookie-consent";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify({ preferences: prefs, timestamp: new Date().toISOString() })
    );
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleAcceptAll = () => saveConsent({ necessary: true, analytics: true, marketing: true });
  const handleDecline = () => saveConsent({ necessary: true, analytics: false, marketing: false });
  const handleSavePreferences = () => saveConsent(preferences);

  if (!showBanner) return null;

  return (
    <>
      <AnimatePresence>
        {showBanner && !showSettings && (
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:bottom-4 sm:left-auto sm:right-4 sm:max-w-md"
          >
            <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-background/80 shadow-2xl shadow-black/10 backdrop-blur-2xl dark:border-border/20 dark:bg-background/90 dark:shadow-black/30">
              {/* Subtle gradient accent line */}
              <div className="absolute inset-x-0 top-0 h-px bg-linear-120-to-r from-transparent via-primary/50 to-transparent" />

              <div className="p-5">
                {/* Header */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-primary/5">
                    <Cookie className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold tracking-tight">Cookie Notice</h3>
                    <p className="text-xs text-muted-foreground">Your privacy matters</p>
                  </div>
                </div>

                {/* Content */}
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                  We use cookies to personalize content and analyze traffic. You can customize your
                  preferences or accept all cookies.
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDecline}
                      className="flex-1 rounded-xl border-border/50 bg-transparent hover:bg-muted/50"
                    >
                      Decline
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleAcceptAll}
                      className="flex-1 rounded-xl bg-primary hover:bg-primary/90"
                    >
                      Accept All
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSettings(true)}
                    className="w-full rounded-xl text-xs text-muted-foreground hover:text-foreground"
                  >
                    Customize preferences
                  </Button>
                </div>

                {/* Privacy link */}
                <p className="mt-4 text-center text-[11px] text-muted-foreground/70">
                  <Link href="/privacy" className="hover:text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  {" · "}
                  <Link href="/cookies" className="hover:text-primary hover:underline">
                    Cookie Policy
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-md gap-0 overflow-hidden rounded-2xl border-border/40 p-0 dark:border-border/20">
          <DialogHeader className="border-b border-border/40 px-6 py-5 dark:border-border/20">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-primary/5">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-base font-semibold">Cookie Preferences</DialogTitle>
                <DialogDescription className="text-xs">
                  Choose which cookies you allow
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-1 p-2">
            {/* Essential */}
            <CookieOption
              icon={Shield}
              iconColor="text-emerald-500"
              iconBg="bg-emerald-500/10"
              title="Essential"
              description="Required for core functionality"
              checked={true}
              disabled
            />

            {/* Analytics */}
            <CookieOption
              icon={BarChart3}
              iconColor="text-blue-500"
              iconBg="bg-blue-500/10"
              title="Analytics"
              description="Help us improve our services"
              checked={preferences.analytics}
              onCheckedChange={(checked) => setPreferences((p) => ({ ...p, analytics: checked }))}
            />

            {/* Marketing */}
            <CookieOption
              icon={Target}
              iconColor="text-violet-500"
              iconBg="bg-violet-500/10"
              title="Marketing"
              description="Personalized advertisements"
              checked={preferences.marketing}
              onCheckedChange={(checked) => setPreferences((p) => ({ ...p, marketing: checked }))}
            />
          </div>

          <div className="flex gap-2 border-t border-border/40 p-4 dark:border-border/20">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="flex-1 rounded-xl"
            >
              Reject All
            </Button>
            <Button
              size="sm"
              onClick={handleSavePreferences}
              className="flex-1 rounded-xl"
            >
              Save Preferences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface CookieOptionProps {
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

function CookieOption({
  icon: Icon,
  iconColor,
  iconBg,
  title,
  description,
  checked,
  disabled,
  onCheckedChange,
}: CookieOptionProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-xl p-3 transition-colors",
        !disabled && "hover:bg-muted/50"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", iconBg)}>
          <Icon className={cn("h-4 w-4", iconColor)} />
        </div>
        <div>
          <Label
            className={cn(
              "text-sm font-medium",
              !disabled && "cursor-pointer"
            )}
          >
            {title}
          </Label>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        className={cn(disabled && "opacity-70")}
      />
    </div>
  );
}
