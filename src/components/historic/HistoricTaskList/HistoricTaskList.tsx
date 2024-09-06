import { useContext } from "react";
import { DBContext } from "../../../context/dbContext";
import { Stack } from "@mantine/core";
import TaskCard from "../../task/TaskCard/TaskCard";
import { useData } from "../../../hooks/useData";
import { Source } from "../../../constants/global.constants";

interface HistoricTaskListProps {
  filter: string | null;
  sort: string | null;
}

const HistoricTaskList = ({ filter, sort }: HistoricTaskListProps) => {
  const { data } = useContext(DBContext);
  const { tasks } = useData({ data, source: Source.HISTORIC, filter, sort });
  return (
    <Stack mt={"md"}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Stack>
  );
};

export default HistoricTaskList;
