import { Center, Text } from "@mantine/core";
import TaskBarChart from "../components/charts/TaskBarChart/TaskBarChart";
import MainLayout from "../layouts/MainLayout/MainLayout";

const ChartPage = () => {
  return (
    <MainLayout>
      <Center mb={"lg"}>
        <Text fz={24} fw={400}>
          Tareas finalizadas
        </Text>
      </Center>
      <TaskBarChart />
    </MainLayout>
  );
};

export default ChartPage;
