import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MainLayout from "./layouts/MainLayout/MainLayout.tsx";
import { MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Task from "./pages/task.page.tsx";

import "./index.css";
import "@mantine/core/styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Task />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <MantineProvider>
    <StrictMode>
      <MainLayout>
        <RouterProvider router={router} />
      </MainLayout>
    </StrictMode>
  </MantineProvider>,
);
