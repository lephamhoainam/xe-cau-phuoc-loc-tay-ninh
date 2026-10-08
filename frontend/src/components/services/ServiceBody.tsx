import type { ComponentType } from "react";
import type { Service, ServiceLayout } from "../../lib/types";
import GridLayout from "./GridLayout";
import StepsLayout from "./StepsLayout";
import TocLayout from "./TocLayout";
import ShowcaseLayout from "./ShowcaseLayout";

const layouts: Record<ServiceLayout, ComponentType<{ service: Service }>> = {
  toc: TocLayout,
  steps: StepsLayout,
  grid: GridLayout,
  showcase: ShowcaseLayout,
};

export default function ServiceBody({ service }: { service: Service }) {
  const Layout = layouts[service.layout];
  return <Layout service={service} />;
}