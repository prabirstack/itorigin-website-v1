"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Loader2,
  Save,
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Clock,
  Share2,
  Link as LinkIcon,
} from "lucide-react";
import { Breadcrumb } from "@/components/admin/shared/breadcrumb";
import { toast } from "sonner";

interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
}

interface Settings {
  id: string;
  companyName: string;
  tagline: string | null;
  description: string | null;
  email: string;
  phone: string;
  whatsapp: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  businessHours: string | null;
  timezone: string | null;
  socialLinks: SocialLinks | null;
  calendlyUrl: string | null;
  supportEmail: string | null;
  salesEmail: string | null;
  mapEmbedUrl: string | null;
  mapLink: string | null;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      setSettings(data.settings);
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;
    setIsSaving(true);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings);
        toast.success("Settings saved successfully");
      } else {
        toast.error("Failed to save settings");
      }
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (field: keyof Settings, value: string) => {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
  };

  const updateSocialLink = (platform: keyof SocialLinks, value: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      socialLinks: {
        ...settings.socialLinks,
        [platform]: value,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load settings</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumb />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Site Settings</h1>
          <p className="text-muted-foreground">
            Manage your website contact information and settings
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="social">Social & Links</TabsTrigger>
        </TabsList>

        {/* Company Info Tab */}
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Company Information
              </CardTitle>
              <CardDescription>
                Basic information about your company
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input
                    value={settings.companyName}
                    onChange={(e) => updateField("companyName", e.target.value)}
                    placeholder="IT Origin"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tagline</Label>
                  <Input
                    value={settings.tagline || ""}
                    onChange={(e) => updateField("tagline", e.target.value)}
                    placeholder="Cybersecurity Excellence"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={settings.description || ""}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Brief description of your company..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Info Tab */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Contact Details
              </CardTitle>
              <CardDescription>
                Contact information displayed on your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Primary Email
                  </Label>
                  <Input
                    type="email"
                    value={settings.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="info@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </Label>
                  <Input
                    value={settings.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="+1 (234) 567-890"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>WhatsApp Number</Label>
                  <Input
                    value={settings.whatsapp || ""}
                    onChange={(e) => updateField("whatsapp", e.target.value)}
                    placeholder="+1234567890"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Support Email</Label>
                  <Input
                    type="email"
                    value={settings.supportEmail || ""}
                    onChange={(e) => updateField("supportEmail", e.target.value)}
                    placeholder="support@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Sales Email</Label>
                  <Input
                    type="email"
                    value={settings.salesEmail || ""}
                    onChange={(e) => updateField("salesEmail", e.target.value)}
                    placeholder="sales@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Business Hours
                  </Label>
                  <Input
                    value={settings.businessHours || ""}
                    onChange={(e) => updateField("businessHours", e.target.value)}
                    placeholder="Mon-Fri 9:00 AM - 6:00 PM"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Timezone</Label>
                <Input
                  value={settings.timezone || ""}
                  onChange={(e) => updateField("timezone", e.target.value)}
                  placeholder="IST"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Address Tab */}
        <TabsContent value="address">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Address Information
              </CardTitle>
              <CardDescription>
                Your company&apos;s physical address
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Address Line 1</Label>
                <Input
                  value={settings.addressLine1 || ""}
                  onChange={(e) => updateField("addressLine1", e.target.value)}
                  placeholder="123 Street Name"
                />
              </div>
              <div className="space-y-2">
                <Label>Address Line 2</Label>
                <Input
                  value={settings.addressLine2 || ""}
                  onChange={(e) => updateField("addressLine2", e.target.value)}
                  placeholder="Suite, Floor, Building"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input
                    value={settings.city || ""}
                    onChange={(e) => updateField("city", e.target.value)}
                    placeholder="Mumbai"
                  />
                </div>
                <div className="space-y-2">
                  <Label>State / Province</Label>
                  <Input
                    value={settings.state || ""}
                    onChange={(e) => updateField("state", e.target.value)}
                    placeholder="Maharashtra"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Postal / ZIP Code</Label>
                  <Input
                    value={settings.postalCode || ""}
                    onChange={(e) => updateField("postalCode", e.target.value)}
                    placeholder="400001"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input
                    value={settings.country || ""}
                    onChange={(e) => updateField("country", e.target.value)}
                    placeholder="India"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Google Maps Link</Label>
                <Input
                  value={settings.mapLink || ""}
                  onChange={(e) => updateField("mapLink", e.target.value)}
                  placeholder="https://maps.google.com/..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social & Links Tab */}
        <TabsContent value="social">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Social Media Links
                </CardTitle>
                <CardDescription>
                  Connect your social media profiles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Twitter / X</Label>
                    <Input
                      value={settings.socialLinks?.twitter || ""}
                      onChange={(e) => updateSocialLink("twitter", e.target.value)}
                      placeholder="https://twitter.com/yourhandle"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>LinkedIn</Label>
                    <Input
                      value={settings.socialLinks?.linkedin || ""}
                      onChange={(e) => updateSocialLink("linkedin", e.target.value)}
                      placeholder="https://linkedin.com/company/yourcompany"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>GitHub</Label>
                    <Input
                      value={settings.socialLinks?.github || ""}
                      onChange={(e) => updateSocialLink("github", e.target.value)}
                      placeholder="https://github.com/yourorg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Facebook</Label>
                    <Input
                      value={settings.socialLinks?.facebook || ""}
                      onChange={(e) => updateSocialLink("facebook", e.target.value)}
                      placeholder="https://facebook.com/yourpage"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Instagram</Label>
                    <Input
                      value={settings.socialLinks?.instagram || ""}
                      onChange={(e) => updateSocialLink("instagram", e.target.value)}
                      placeholder="https://instagram.com/yourhandle"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>YouTube</Label>
                    <Input
                      value={settings.socialLinks?.youtube || ""}
                      onChange={(e) => updateSocialLink("youtube", e.target.value)}
                      placeholder="https://youtube.com/@yourchannel"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="w-5 h-5" />
                  Additional Links
                </CardTitle>
                <CardDescription>
                  Other important links for your business
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Calendly URL (for booking meetings)</Label>
                  <Input
                    value={settings.calendlyUrl || ""}
                    onChange={(e) => updateField("calendlyUrl", e.target.value)}
                    placeholder="https://calendly.com/yourname"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
