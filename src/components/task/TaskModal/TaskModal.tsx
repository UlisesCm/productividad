import {
  Box,
  Button,
  Group,
  Modal,
  NumberInput,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";

import { Form, useForm, zodResolver } from "@mantine/form";
import { TaskStatus } from "../../../enums/task.enum";
import { Task } from "../../../interfaces/task.interface";
import {
  durationOptions,
  taskStatusLabel,
} from "../../../constants/task.constants";
import { useContext, useEffect } from "react";
import { TaskContext } from "../../../context/TaskContext";
import { DBContext } from "../../../context/dbContext";
import { taskSchema } from "../../../schemas/task.schema";
import { arrayNumberToSeconds } from "../../../utils/arrayNumberToSeconds";
import { secondsToArrayNumber } from "../../../utils/secondsToArrayNumber";

interface TaskFormProps extends Task {
  time: number[];
  predefinedTime: string;
}

const TaskModal = () => {
  const {
    modalState: { opened, close },
    taskState: { selectedTask, setSelectedTask },
  } = useContext(TaskContext);

  const { addTask, updateTask } = useContext(DBContext);

  const form = useForm<TaskFormProps>({
    validate: zodResolver(taskSchema),
    initialValues: {
      id: "",
      title: "",
      description: "",
      status: TaskStatus.ACTIVE,
      time: [0, 0, 0],
      predefinedTime: "",
      timeAssigned: 0,
      remainingTime: 0,
      createdAt: undefined,
      updatedAt: undefined,
    },
  });

  const onClose = () => {
    form.reset();
    close();
    setSelectedTask(null);
  };

  const handleSubmit = async (values: typeof form.values) => {
    const time =
      values.predefinedTime === "0"
        ? arrayNumberToSeconds(values.time)
        : Number(values.predefinedTime);
    const taskData: Task = {
      id: values.id ?? crypto.randomUUID(),
      title: values.title,
      description: values.description,
      status: values.status,
      timeAssigned: time,
      remainingTime: time,
      createdAt: values.createdAt ?? new Date(),
      updatedAt: values.updatedAt ?? new Date(),
    };
    if (selectedTask) {
      updateTask(taskData);
    } else {
      addTask(taskData);
    }
    onClose();
  };

  useEffect(() => {
    form.setValues({
      id: selectedTask?.id || "",
      title: selectedTask?.title || "",
      description: selectedTask?.description || "",
      status: selectedTask?.status || TaskStatus.PAUSED,
      timeAssigned: selectedTask?.timeAssigned || 0,
      remainingTime: selectedTask?.remainingTime || 0,
      createdAt: selectedTask?.createdAt,
      updatedAt: selectedTask?.updatedAt,
      time: secondsToArrayNumber(selectedTask?.remainingTime || 0),
    });
  }, [selectedTask]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={!selectedTask ? "Nueva tarea" : "Editar tarea"}
      centered
      styles={{
        root: {
          marginLeft: "-100vw",
        },
      }}
    >
      <Form form={form} onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Titulo"
            placeholder="Ingrese un titulo para su tarea..."
            readOnly={!!selectedTask}
            {...form.getInputProps("title")}
          />
          <Textarea
            label="Descripción"
            placeholder="Inserte una descripción..."
            rows={5}
            {...form.getInputProps("description")}
          />
          <Select
            data={taskStatusLabel}
            placeholder="Selecciona un status"
            label="Estado"
            readOnly={!!selectedTask}
            {...form.getInputProps("status")}
          />
          <Select
            label="Duración"
            data={durationOptions}
            placeholder="Selecciona una duración..."
            {...form.getInputProps("predefinedTime")}
          />
          <Box h={70}>
            {form.values.predefinedTime === "0" && (
              <>
                <Text fz={12} c="gray" lh={1}>
                  Tiempo máximo: 02:00:00
                </Text>
                <Group align="end">
                  <NumberInput
                    w={45}
                    label="hr"
                    maxLength={1}
                    max={2}
                    prefix="0"
                    hideControls
                    placeholder="00"
                    {...form.getInputProps("time.0")}
                  />
                  <Text fz={24} fw={600} lh={1.8}>
                    :
                  </Text>
                  <NumberInput
                    w={45}
                    label="min"
                    maxLength={2}
                    max={60}
                    hideControls
                    placeholder="00"
                    {...form.getInputProps("time.1")}
                  />
                  <Text fz={24} fw={600} lh={1.8}>
                    :
                  </Text>
                  <NumberInput
                    w={45}
                    label="seg"
                    maxLength={2}
                    max={60}
                    hideControls
                    placeholder="00"
                    {...form.getInputProps("time.2")}
                  />
                </Group>
              </>
            )}
          </Box>

          <Group justify="end" mt={"sm"}>
            <Button color="gray" onClick={close}>
              Cancelar
            </Button>
            <Button type="submit">
              {!selectedTask ? "Crear tarea" : "Modificar tarea"}
            </Button>
          </Group>
        </Stack>
      </Form>
    </Modal>
  );
};

export default TaskModal;
