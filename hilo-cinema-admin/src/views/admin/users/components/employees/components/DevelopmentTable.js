import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import { fetchEmployees } from "reduxHilo/actions/employeeAction";
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";

export default function DevelopmentTable(props) {
  const { columnsData } = props;
  const columns = useMemo(() => columnsData, [columnsData]);

  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.employees);
  const loading = useSelector((state) => state.employee.loading);
  const error = useSelector((state) => state.employee.error);
  const history = useHistory();

  const [filterInput, setFilterInput] = useState("");

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const positions = useMemo(() => {
    const posSet = new Set();
    employees.forEach(employee => {
      if (employee.position) {
        posSet.add(employee.position);
      }
    });
    return Array.from(posSet);
  }, [employees]);

  const data = useMemo(() => {
    if (filterInput) {
      return employees.filter((employee) =>
        employee.position && employee.position.toLowerCase().includes(filterInput.toLowerCase())
      );
    }
    return employees;
  }, [employees, filterInput]);

  const handleEdit = (row) => {
    history.push(`/edit-employee/${row.original.id}`);
  };

  const handleDelete = (row) => {
    console.log("Delete", row.original);
    // Add your delete logic here
  };

  const columnsWithActions = useMemo(() => [
    ...columns,
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <div>
          <Button onClick={() => handleEdit(row)} mr="10px">Edit</Button>
          <Button onClick={() => handleDelete(row)} colorScheme="red">Delete</Button>
        </div>
      ),
    },
  ], [columns]);

  const tableInstance = useTable(
    {
      columns: columnsWithActions,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  return (
    <Card direction="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
          Employees
        </Text>
        <Menu />
      </Flex>
      <Flex mb="20px" px="25px" justify="space-between" align="center">
        <Select
          placeholder="Filter by position"
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
          maxW="300px"
        >
          {positions.map((position) => (
            <option key={position} value={position}>
              {position}
            </option>
          ))}
        </Select>
      </Flex>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe="10px"
                    key={index}
                    borderColor={borderColor}
                  >
                    <Flex
                      justify="space-between"
                      align="center"
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color="gray.400"
                    >
                      {column.render("Header")}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()} color={textColor}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {cell.render("Cell")}
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </Card>
  );
}
