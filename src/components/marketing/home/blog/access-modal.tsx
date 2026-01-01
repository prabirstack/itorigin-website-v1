"use client";

import React from "react";
import { Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  email: string;
  isSubmitting: boolean;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onSubmit: () => void;
}

export function AccessModal({
  open,
  onOpenChange,
  name,
  email,
  isSubmitting,
  onNameChange,
  onEmailChange,
  onSubmit,
}: AccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-md border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Mail className="w-5 h-5 text-primary" />
            Access Security Resources
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter your details to receive instant access to our comprehensive
            cybersecurity resource library.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                className="pl-10 bg-card/50 border-border/60 focus:border-primary/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                className="pl-10 bg-card/50 border-border/60 focus:border-primary/50"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-border/60 hover:border-border/80"
            >
              Cancel
            </Button>
            <Button
              onClick={onSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              {isSubmitting ? "Sending..." : "Get Access"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
