import { AppShell, Burger, Button, Container, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PropsWithChildren } from "react";
import classes from "./MainLayout.module.css";
import { useNavigate } from "react-router-dom";

const MainLayout = ({ children }: PropsWithChildren) => {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();

  const NavBarButtons = [
    { label: "Tareas", icon: "home", to: "/" },
    { label: "Historial", icon: "home", to: "/historic" },
    { label: "Gráficas", icon: "home", to: "/" },
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
      <AppShell.Header className={classes.app_sell_header_container}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Text fz={"xl"} fw={600} variant="gradient">
          Aplicación de productividad - Ulises Ciprés
        </Text>
      </AppShell.Header>
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
      <AppShell.Main className={classes.app_sell_main_container}>
        <Container className={classes.main_container}>{children}</Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
