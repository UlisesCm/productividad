import { useEffect, useState } from "react";
import { Task } from "../interfaces/task.interface";
import { FilterOptions, SortOptions, TaskStatus } from "../enums/task.enum";
import { Source } from "../constants/global.constants";

interface UseDataProps {
  data: Task[];
  source: "tasks" | "historic";
  filter: string | null;
  sort: string | null;
}
export function useData({ data, source, filter, sort }: UseDataProps) {
  const [tasks, setTasks] = useState<Task[]>(data);
  const filterData = (data: Task[]): Task[] => {
    let filteredData = [...data];

    switch (filter) {
      case FilterOptions.SHORT:
        filteredData = filteredData.filter((task) => {
          const limitTime =
            source === Source.HISTORIC ? task.timeAssigned : task.remainingTime;
          return (limitTime ?? 0) <= 1800;
        });
        break;

      case FilterOptions.MEDIUM:
        filteredData = filteredData.filter((task) => {
          const limitTime =
            source === Source.HISTORIC ? task.timeAssigned : task.remainingTime;
          return (limitTime ?? 0) > 1800 && (limitTime ?? 0) <= 3600;
        });
        break;

      case FilterOptions.LONG:
        filteredData = filteredData.filter((task) => {
          const limitTime =
            source === Source.HISTORIC ? task.timeAssigned : task.remainingTime;
          return (limitTime ?? 0) > 3600;
        });
        break;

      default:
        break;
    }

    return filteredData;
  };

  const sortData = (data: Task[], sort: string | null): Task[] => {
    const sortedData = [...data];

    switch (sort) {
      case SortOptions.RECENT:
        sortedData.sort((a, b) => {
          const dateA = new Date(a.createdAt ?? "");
          const dateB = new Date(b.createdAt ?? "");
          return dateB.getTime() - dateA.getTime();
        });
        break;

      case SortOptions.UPDATE:
        sortedData.sort((a, b) => {
          const dateA = new Date(a.updatedAt ?? "");
          const dateB = new Date(b.updatedAt ?? "");
          return dateB.getTime() - dateA.getTime();
        });
        break;

      case SortOptions.DURATION:
        sortedData.sort((a, b) => {
          const limitA =
            source === Source.HISTORIC ? b.timeAssigned : b.remainingTime;
          const limitB =
            source === Source.HISTORIC ? a.timeAssigned : a.remainingTime;
          return (limitB ?? 0) - (limitA ?? 0);
        });

        break;

      case SortOptions.DURATION_DESC:
        sortedData.sort((a, b) => {
          const limitA =
            source === Source.HISTORIC ? b.timeAssigned : b.remainingTime;
          const limitB =
            source === Source.HISTORIC ? a.timeAssigned : a.remainingTime;
          return (limitA ?? 0) - (limitB ?? 0);
        });
        break;

      default:
        break;
    }

    return sortedData;
  };

  useEffect(() => {
    let tasksFilter = [];
    if (source === Source.HISTORIC) {
      tasksFilter = data.filter((task) => task.status === TaskStatus.FINISHED);
    } else {
      tasksFilter = data.filter((task) => task.status !== TaskStatus.FINISHED);
    }

    const dataFiltered = filterData(tasksFilter);
    const dataSorted = sortData(dataFiltered, sort);
    setTasks(dataSorted);
  }, [filter, sort, data]);

  return { tasks };
}
