import { useContext } from "react";
import { DBContext } from "../../../context/dbContext";
import { BarChart } from "@mantine/charts";
import { processData } from "../../../utils/processBarChartData";

function TaskBarChart() {
  const { data: tasks } = useContext(DBContext);
  const processedData = processData(tasks);

  return (
    <BarChart
      h={400}
      data={processedData}
      dataKey="day"
      series={[{ name: "Tareas", color: "blue.6" }]}
      tickLine="x"
      withLegend
    />
  );
}

export default TaskBarChart;
