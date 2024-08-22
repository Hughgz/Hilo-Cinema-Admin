import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Flex,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { fetchEmployees, updateEmployeeStatus } from "reduxHilo/actions/employeeAction"; // Updated imports
import Card from "components/card/Card";
import EmployeeMenu from "components/menu/EmployeeMenu";
import EditEmployeeForm from "./EditEmployee";

export default function EmployeeList(props) {
  const { columnsData } = props;
  const columns = useMemo(() => columnsData, [columnsData]);

  const dispatch = useDispatch();
  const { loading, employees, error } = useSelector((state) => state.employee);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filterInput, setFilterInput] = useState("");

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const positions = useMemo(() => {
    const posSet = new Set();
    employees.forEach((employee) => {
      if (employee.position) {
        posSet.add(employee.position);
      }
    });
    return Array.from(posSet);
  }, [employees]);

  const data = useMemo(() => {
    return employees
      .filter((employee) => employee.status !== "Inactive") // Exclude inactive employees
      .filter((employee) =>
        filterInput
          ? employee.position &&
            employee.position.toLowerCase().includes(filterInput.toLowerCase())
          : true
      );
  }, [employees, filterInput]);

  const handleEdit = (row) => {
    setSelectedEmployee(row.original);
    onOpen();
  };

  const handleDelete = (row) => {
    dispatch(updateEmployeeStatus(row.original.id));
  };

  const columnsWithActions = useMemo(
    () => [
      ...columns,
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div>
            <Button onClick={() => handleEdit(row)} mr="10px">
              Edit
            </Button>
            <Button onClick={() => handleDelete(row)} colorScheme="red">
              Hide
            </Button>
          </div>
        ),
      },
    ],
    [columns]
  );

  const tableInstance = useTable(
    {
      columns: columnsWithActions,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
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
    pageOptions,
    gotoPage,
    state: { pageIndex },
  } = tableInstance;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  return (
    <>
      <Card
        direction="column"
        w="100%"
        px="0px"
        overflowX={{ sm: "scroll", lg: "hidden" }}
      >
        <Flex px="25px" justify="space-between" mb="20px" align="center">
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            Employees
          </Text>
          <EmployeeMenu></EmployeeMenu>
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
          <>
            <Table
              {...getTableProps()}
              variant="simple"
              mb="24px"
            >
              <Thead>
                {headerGroups.map((headerGroup, index) => (
                  <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column, index) => (
                      <Th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        key={index}
                        borderColor={borderColor}
                      >
                        <div className="flex justify-between items-center">
                          {column.render("Header")}
                        </div>
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

            <Flex justifyContent="center" alignItems="center" mt="4">
              <div className="flex space-x-2">
                {pageOptions.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => gotoPage(pageNumber)}
                    className={`px-3 py-1 border rounded ${
                      pageIndex === pageNumber
                        ? "bg-blue-500 text-white"
                        : "bg-white text-blue-500"
                    }`}
                  >
                    {pageNumber + 1}
                  </button>
                ))}
              </div>
            </Flex>
          </>
        )}
      </Card>

      {selectedEmployee && (
        <EditEmployeeForm
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setSelectedEmployee(null); // Clear the selected employee after closing
          }}
          fetchEmployees={() => dispatch(fetchEmployees())}
          employeeId={selectedEmployee.id}
        />
      )}
    </>
  );
}
