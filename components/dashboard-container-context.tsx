"use client";

import { createContext, useContext } from "react";

export const DashboardContainerContext = createContext<Element | null>(null);

export function useDashboardContainer() {
  return useContext(DashboardContainerContext);
}
