import TaskModal from "../components/task/TaskModal/TaskModal";
import { TaskProvider } from "../context/TaskContext";
import CreateTaskButton from "../components/task/CreateTaskButton/CreateTaskButton";
import { Group } from "@mantine/core";
import { useState } from "react";
import MainLayout from "../layouts/MainLayout/MainLayout";
import TaskList from "../components/task/TaskList/TaskList";
import FilterAndSortSelects from "../components/shared/FilterAndSortSelects/FilterAndSortSelects";

const TaskPage = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const [sort, setSort] = useState<string | null>(null);

  return (
    <MainLayout>
      <TaskProvider>
        <Group align="end" justify="space-between">
          <FilterAndSortSelects
            filter={filter}
            setFilter={setFilter}
            sort={sort}
            setSort={setSort}
          />
          <CreateTaskButton />
        </Group>
        <TaskList filter={filter} sort={sort} />
        <TaskModal />
      </TaskProvider>
    </MainLayout>
  );
};

export default TaskPage;
