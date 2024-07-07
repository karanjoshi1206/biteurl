import { createRootRouteWithContext } from "@tanstack/react-router";
import RootLayout from "../layout/RootLayout";

export interface MyRouterContext {
  auth: boolean;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <RootLayout />
});
