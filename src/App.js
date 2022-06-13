import React, { useState, useEffect } from 'react';
import './App.scss';
import Pagination from './components/Pagination/Pagination';
import Table from './components/Table/Table';
import TableFilter from './components/TableFilters/TableFilter';
import { data } from './data/data';

function App() {
  const [usersData, setUsersData] = useState(data)
  const [usersDisplay, setUsersDisplay] = useState(usersData)
  const [sortConfig, setSortConfig] = useState({
    sortDirection: 'ASC',
    sortData: null,
    filterName: null,
    filterCondition: null,
    filterArgument: null,
  })

  const [currentPage, setCurrentPage] = useState(1);
  const usersOnPage = 5;
  const lastUserIndex = currentPage * usersOnPage;
  const firstUserIndex = lastUserIndex - usersOnPage;
  const currentUsers = usersDisplay.slice(firstUserIndex, lastUserIndex);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Функция сортировки данных
  function handleSort(data) {
    if (sortConfig.sortData === data) {
      if (sortConfig.sortDirection === 'ASC') {
        setSortConfig({ ...sortConfig, sortDirection: 'DESC', sortData: data });
        return;
      }
    }
    setSortConfig({ ...sortConfig, sortDirection: 'ASC', sortData: data });
  }
  // Функция сброса данных
  function resetHandle() {
    setUsersData([...data])
    setCurrentPage(1);
    setSortConfig({
      sortDirection: null,
      sortData: null,
      filterName: null,
      filterCondition: null,
      filterArgument: null,
    })
  }

  // Фильтрация данных
  function filterData(config) {
    setSortConfig({
      sortDirection: 'ASC',
      sortData: null,
      filterName: config.name,
      filterCondition: config.condition,
      filterArgument: config.argument
    });
    setCurrentPage(1);
    setUsersData([...data])
  }



  useEffect(() => {

    if (sortConfig.sortDirection === 'ASC') {
      setUsersData([...usersData.sort((a, b) => (a[sortConfig.sortData] > b[sortConfig.sortData] ? 1 : -1))])
    } else if (sortConfig.sortDirection === 'DESC') {
      setUsersData([...usersData.sort((a, b) => (a[sortConfig.sortData] < b[sortConfig.sortData] ? 1 : -1))]);
    }

    if (sortConfig.filterName && sortConfig.filterCondition && sortConfig.filterArgument) {

      switch (sortConfig.filterName) {
        case 'name': {
          if (sortConfig.filterCondition === 'equal')
            setUsersData([
              ...usersData.filter((e) => e.name === sortConfig.filterArgument)
            ]);
          if (sortConfig.filterCondition === 'contain')
            setUsersData([
              ...usersData.filter((e) => e.name.includes(sortConfig.filterArgument))
            ]);
          if (sortConfig.filterCondition === 'more')
            setUsersData([
              ...usersData.filter((e) => e.name > sortConfig.filterArgument)
            ]);
          if (sortConfig.filterCondition === 'less')
            setUsersData([
              ...usersData.filter((e) => e.name < sortConfig.filterArgument)
            ]);
          break;
        }

        case 'count': {
          if (sortConfig.filterCondition === 'equal')
            setUsersData([
              ...usersData.filter((e) => e.count === sortConfig.filterArgument
              )
            ]);
          if (sortConfig.filterCondition === 'contain')
            setUsersData([
              ...usersData.filter((e) => e.count.toString().includes(sortConfig.filterArgument))
            ]);
          if (sortConfig.filterCondition === 'more')
            setUsersData([
              ...usersData.filter((e) => e.count > sortConfig.filterArgument)
            ]);
          if (sortConfig.filterCondition === 'less')
            setUsersData([
              ...usersData.filter((e) => e.count < sortConfig.filterArgument)
            ]);
          break;
        }

        case 'distance': {
          if (sortConfig.filterCondition === 'equal')
            setUsersData([
              ...usersData.filter((e) => e.distance === sortConfig.filterArgument)
            ]);
          if (sortConfig.filterCondition === 'contain')
            setUsersData([
              ...usersData.filter((e) => e.distance.toString().includes(sortConfig.filterArgument)
              )
            ]);

          if (sortConfig.filterCondition === 'more')
            setUsersData([
              ...usersData.filter(
                (e) => e.distance > sortConfig.filterArgument
              )
            ]);
          if (sortConfig.filterCondition === 'less')
            setUsersData([
              ...usersData.filter(
                (e) => e.distance < sortConfig.filterArgument)
            ]);
          break;
        }
        default: return;
      }
    }
  }, [sortConfig])

  useEffect(
    () => {
      setUsersDisplay(
        [...usersData])
    },
    [usersData]
  );

  return (
    <div className='App'>
      <div className='wrapper'>
        <TableFilter filterData={filterData} onReset={resetHandle} />
        <Table currentUsers={currentUsers} onSort={handleSort} />
        <Pagination currentPage={currentPage} usersOnPage={usersOnPage} totalUsers={usersDisplay.length} paginate={paginate} />
      </div>
    </div>
  );
}

export default App;
