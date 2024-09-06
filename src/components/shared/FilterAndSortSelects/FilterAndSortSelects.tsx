import { Group, Select } from "@mantine/core";
import { filterOptions, sortOptions } from "../../../constants/task.constants";

interface FilterAndSortSelectsProps {
  filter: string | null;
  setFilter: (filter: string) => void;
  sort: string | null;
  setSort: (sort: string) => void;
}

const FilterAndSortSelects = ({
  filter,
  setFilter,
  sort,
  setSort,
}: FilterAndSortSelectsProps) => {
  return (
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
  );
};

export default FilterAndSortSelects;
