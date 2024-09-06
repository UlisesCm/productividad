import MainLayout from "../layouts/MainLayout/MainLayout";
import HistoricTaskList from "../components/historic/HistoricTaskList/HistoricTaskList";
import { useState } from "react";
import FilterAndSortSelects from "../components/shared/FilterAndSortSelects/FilterAndSortSelects";

const HistoricTask = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const [sort, setSort] = useState<string | null>(null);
  return (
    <MainLayout>
      <>
        <FilterAndSortSelects
          filter={filter}
          setFilter={setFilter}
          sort={sort}
          setSort={setSort}
        />
        <HistoricTaskList filter={filter} sort={sort} />
      </>
    </MainLayout>
  );
};

export default HistoricTask;
