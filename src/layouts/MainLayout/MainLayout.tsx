import { AppShell, Burger, Button, Container, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PropsWithChildren } from "react";
import classes from "./MainLayout.module.css";

const MainLayout = ({ children }: PropsWithChildren) => {
  const [opened, { toggle }] = useDisclosure();
  const NavBarButtons = [
    { label: "Tareas", icon: "home", to: "/" },
    { label: "Historial", icon: "home", to: "/" },
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
        {NavBarButtons.map((button) => (
          <Button variant="subtle" radius={0}>
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
