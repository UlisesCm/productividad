import TaskModal from "../components/task/TaskModal/TaskModal";
import { TaskProvider } from "../context/TaskContext";
import CreateTaskButton from "../components/task/CreateTaskButton/CreateTaskButton";
import { Group, Select } from "@mantine/core";
import { useState } from "react";
import MainLayout from "../layouts/MainLayout/MainLayout";
import { filterOptions, sortOptions } from "../constants/task.constants";
import TaskList from "../components/task/TaskList/TaskList";

const TaskPage = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const [sort, setSort] = useState<string | null>(null);

  return (
    <MainLayout>
      <TaskProvider>
        <Group align="end" justify="space-between">
          <Group>
            <Select
              label="Filtrar por duración"
              placeholder="Filtrar por duración..."
              data={filterOptions}
              value={filter}
              onChange={(value) => setFilter(value as string)}
            />
            <Select
              label="Ordenar por"
              placeholder="Ordenar por..."
              data={sortOptions}
              value={sort}
              onChange={(value) => setSort(value as string)}
            />
          </Group>
          <CreateTaskButton />
        </Group>
        <TaskList filter={filter} sort={sort} />
        <TaskModal />
      </TaskProvider>
    </MainLayout>
  );
};

export default TaskPage;
