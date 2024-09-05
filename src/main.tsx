import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MainLayout from "./layouts/MainLayout/MainLayout.tsx";
import { MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DBProvider } from "./context/dbContext.tsx";
import Task from "./pages/task.page.tsx";
import Historic from "./pages/historic.page.tsx";

import "./index.css";
import "@mantine/core/styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Task />,
  },
  {
    path: "/historic",
    element: <Historic />,
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
