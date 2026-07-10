import { Outlet, createRootRoute } from "@tanstack/react-router";

// oxlint-disable-next-line import/no-unassigned-import
import "../styles.css";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
