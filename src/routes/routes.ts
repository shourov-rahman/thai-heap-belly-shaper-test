import { lazy, LazyExoticComponent, FunctionComponent } from "react";
import ThaiHeapBellyShaper from "../pages/thaiHeapBellyShaper";
const NotFound = lazy(() => import("../pages/notFound"));

interface TAppRoutes {
  path: string;
  component: LazyExoticComponent<FunctionComponent> | FunctionComponent;
}

export const AppRoutes: TAppRoutes[] = [
  {
    path: "/products/double-layer-slimming-thai-hip-and-belly-shaper",
    component: ThaiHeapBellyShaper,
  },
  {
    path: "*",
    component: NotFound,
  },
];
