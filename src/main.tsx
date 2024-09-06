import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DBProvider } from "./context/dbContext.tsx";
import Task from "./pages/task.page.tsx";
import Historic from "./pages/historic.page.tsx";
import ChartPage from "./pages/chart.page.tsx";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Task />,
  },
  {
    path: "/historic",
    element: <Historic />,
  },
  {
    path: "/chart",
    element: <ChartPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <MantineProvider>
    <StrictMode>
      <DBProvider>
        <RouterProvider router={router} />
      </DBProvider>
    </StrictMode>
  </MantineProvider>,
);
