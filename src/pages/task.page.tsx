import TaskCard from "../components/task/TaskCard/TaskCard";
import { data } from "../data/data";
import TaskModal from "../components/task/TaskModal/TaskModal";
import { TaskProvider } from "../context/TaskContext";
import CreateTaskButton from "../components/task/CreateTaskButton/CreateTaskButton";
import { Stack } from "@mantine/core";

const TaskPage = () => {
  return (
    <TaskProvider>
      <CreateTaskButton />
      <Stack mt={"md"}>
        {data?.map((task) => (
          <TaskCard task={task} />
        ))}
      </Stack>
      <TaskModal />
    </TaskProvider>
  );
};

export default TaskPage;
