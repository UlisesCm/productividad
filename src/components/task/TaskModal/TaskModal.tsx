import {
  Button,
  Group,
  Modal,
  Select,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { Form, useForm } from "@mantine/form";
import { TaskStatus } from "../../../enums/task.enum";
import { data } from "../../../data/data";

import { Task } from "../../../interfaces/task.interface";
import { taskStatusLabel } from "../../../constants/task.constants";
import { useContext, useEffect } from "react";
import { TaskContext } from "../../../context/TaskContext";

interface TaskForm extends Task {
  rawTime: string;
}
const TaskModal = () => {
  const {
    modalState: { opened, close },
    taskState: { selectedTask },
  } = useContext(TaskContext);

  const form = useForm<TaskForm>({
    initialValues: {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      status: TaskStatus.ACTIVE,
      rawTime: "",
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    data.push({
      id: values.id,
      title: values.title,
      description: values.description,
      status: values.status,
      // time: formatTimeString(values.rawTime),
      // createdAt: new Date(),
      // updatedAt: new Date(),
    });
    close();
  };

  useEffect(() => {
    form.setValues({
      id: selectedTask?.id || "",
      title: selectedTask?.title || "",
      description: selectedTask?.description || "",
      status: selectedTask?.status || TaskStatus.ACTIVE,
      rawTime: selectedTask?.time?.toISOString() || "",
    });
  }, [selectedTask]);

  return (
    <Modal
      opened={opened}
      onClose={close}
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
            {...form.getInputProps("status")}
          />

          <TimeInput
            withSeconds
            label="Tiempo"
            {...form.getInputProps("time")}
          />
          <Group justify="end" mt={"sm"}>
            <Button color="gray" onClick={close}>
              Cancelar
            </Button>
            <Button type="submit">Crear</Button>
          </Group>
        </Stack>
      </Form>
    </Modal>
  );
};

export default TaskModal;
