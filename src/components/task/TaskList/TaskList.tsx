import { useContext } from "react";
import { DBContext } from "../../../context/dbContext";
import { Stack } from "@mantine/core";
import TaskCard from "../TaskCard/TaskCard";
import { Source } from "../../../constants/global.constants";
import { useData } from "../../../hooks/useData";

interface TaskListProps {
  filter: string | null;
  sort: string | null;
}

const TaskList = ({ filter, sort }: TaskListProps) => {
  const { data } = useContext(DBContext);
  const { tasks } = useData({ data, source: Source.TASKS, filter, sort });

  return (
    <Stack mt={"md"}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Stack>
  );
};

export default TaskList;
