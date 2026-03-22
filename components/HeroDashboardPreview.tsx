"use client";

import { useState } from "react";
import { DashboardContainerContext } from "@/components/dashboard-container-context";
import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import data from "@/app/dashboard/data.json";

export default function HeroDashboardPreview() {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  return (
    <DashboardContainerContext.Provider value={container}>
    <div
      ref={setContainer}
      className="hero-dashboard"
      style={{
        transform: "scale(0.88)",
        transformOrigin: "top left",
        width: "113.6%",
        height: "calc(90vh / 0.88)",
        "--sidebar": "#f7f7f7",
        "--sidebar-foreground": "#0a0a0a",
        "--sidebar-primary": "#0a0a0a",
        "--sidebar-primary-foreground": "#ffffff",
        "--sidebar-accent": "#efefef",
        "--sidebar-accent-foreground": "#0a0a0a",
        "--sidebar-border": "rgba(0,0,0,0.08)",
        "--radius": "0.5rem",
        "--card": "#fafafa",
        "--muted": "#f3f3f3",
      } as React.CSSProperties}
    >
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
            height: "100%",
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div>
                <DataTable data={data} container={container} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
    </DashboardContainerContext.Provider>
  );
}
