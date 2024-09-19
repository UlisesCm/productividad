import { AppShell, Burger, Button, Container, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PropsWithChildren } from "react";
import classes from "./MainLayout.module.css";
import { useNavigate } from "react-router-dom";

/**
 * Main layout component for the application.
 * Provides a consistent structure with a collapsible navigation bar.
 */
const MainLayout = ({ children }: PropsWithChildren) => {
  const [opened, { toggle }] = useDisclosure();

  const navigate = useNavigate();

  const NavBarButtons = [
    { label: "Tareas", to: "/" },
    { label: "Historial", to: "/historic" },
    { label: "Gráfica", to: "/chart" },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 200,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding={"md"}
    >
      {/* Header component */}
      <AppShell.Header className={classes.app_sell_header_container}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Text fz={"xl"} fw={600} variant="gradient">
          Aplicación de productividad
        </Text>
      </AppShell.Header>

      {/* Navigation bar component */}
      <AppShell.Navbar>
        {NavBarButtons.map((button, index: number) => (
          <Button
            variant="subtle"
            radius={0}
            key={index}
            onClick={() => navigate(button.to)}
          >
            {button.label}
          </Button>
        ))}
      </AppShell.Navbar>

      {/* Main content area */}
      <AppShell.Main className={classes.app_sell_main_container}>
        <Container className={classes.main_container}>{children}</Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
