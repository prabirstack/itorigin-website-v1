"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface NavService {
  id: string;
  name: string;
  href: string;
  description: string;
  iconName: string | null;
}

interface ServicesContextType {
  services: NavService[];
  isLoading: boolean;
  error: string | null;
}

const ServicesContext = createContext<ServicesContextType>({
  services: [],
  isLoading: true,
  error: null,
});

export const useServices = () => useContext(ServicesContext);

export function ServicesProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<NavService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services?nav=true");
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data.services || []);
      } catch (err) {
        console.error("Failed to fetch services:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        // Fallback to default services if API fails
        setServices([
          {
            id: "default-1",
            name: "Managed SOC Services",
            href: "/services/managed-soc-services",
            description: "24/7 security operations center with advanced threat detection",
            iconName: "Shield",
          },
          {
            id: "default-2",
            name: "Offensive Security",
            href: "/services/offensive-security",
            description: "Penetration testing and vulnerability assessments",
            iconName: "Target",
          },
          {
            id: "default-3",
            name: "GRC Services",
            href: "/services/grc-services",
            description: "Governance, risk management, and compliance solutions",
            iconName: "FileCheck",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <ServicesContext.Provider value={{ services, isLoading, error }}>
      {children}
    </ServicesContext.Provider>
  );
}
