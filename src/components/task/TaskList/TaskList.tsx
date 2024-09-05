import { useContext, useEffect, useState } from "react";
import { DBContext } from "../../../context/dbContext";
import { Stack } from "@mantine/core";
import TaskCard from "../TaskCard/TaskCard";
import { Task } from "../../../interfaces/task.interface";

interface TaskListProps {
  filter: string | null;
  sort: string | null;
}

const TaskList = ({ filter, sort }: TaskListProps) => {
  const { data } = useContext(DBContext);
  const [tasks, setTasks] = useState<Task[]>(data);

  const filterData = (data: Task[]): Task[] => {
    let filteredData = [...data];

    switch (filter) {
      case "short":
        filteredData = filteredData.filter(
          (task) => (task?.remainingTime ?? 0) <= 1600,
        );
        break;

      case "medium":
        filteredData = filteredData.filter(
          (task) =>
            (task?.remainingTime ?? 0) <= 2700 &&
            (task?.remainingTime ?? 0) > 1600,
        );
        break;

      case "long":
        filteredData = filteredData.filter(
          (task) => (task?.remainingTime ?? 0) > 2700,
        );
        break;

      default:
        break;
    }

    return filteredData;
  };

  const sortData = (data: Task[], sort: string | null): Task[] => {
    const sortedData = [...data];

    switch (sort) {
      case "recent":
        sortedData.sort((a, b) => {
          const dateA = new Date(a.createdAt ?? "");
          const dateB = new Date(b.createdAt ?? "");
          return dateB.getTime() - dateA.getTime();
        });
        break;

      case "update":
        sortedData.sort((a, b) => {
          const dateA = new Date(a.updatedAt ?? "");
          const dateB = new Date(b.updatedAt ?? "");
          return dateB.getTime() - dateA.getTime();
        });
        break;

      case "duration":
        sortedData.sort(
          (a, b) => (a.remainingTime ?? 0) - (b.remainingTime ?? 0),
        );
        break;

      case "duration desc":
        sortedData.sort(
          (a, b) => (b.remainingTime ?? 0) - (a.remainingTime ?? 0),
        );
        break;

      default:
        break;
    }

    return sortedData;
  };

  useEffect(() => {
    const dataFiltered = filterData(data);
    const dataSorted = sortData(dataFiltered, sort);
    setTasks(dataSorted);
  }, [filter, sort, data]);

  return (
    <Stack mt={"md"}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Stack>
  );
};

export default TaskList;
