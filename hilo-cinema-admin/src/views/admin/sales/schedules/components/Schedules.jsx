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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { fetchSchedules } from "reduxHilo/actions/scheduleAction";
import Card from "components/card/Card";
import Menu from "components/menu/ScheduleMenu"; // Cập nhật nếu có Menu riêng cho Schedule
import EditScheduleForm from "./EditSchedule"; // Cập nhật nếu có Modal riêng cho Schedule

export default function Schedules(props) {
  const { columnsData } = props;
  const columns = useMemo(() => columnsData, [columnsData]);

  const dispatch = useDispatch();
  const { loading, schedules, error } = useSelector((state) => state.schedule);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();

  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [filterInput, setFilterInput] = useState("");

  useEffect(() => {
    dispatch(fetchSchedules());
  }, [dispatch]);

  const country = useMemo(() => {
    const countrySet = new Set();
    schedules.forEach((schedule) => {
      if (schedule.country) {
        countrySet.add(schedule.country);
      }
    });
    return Array.from(countrySet);
  }, [schedules]);

  const data = useMemo(() => {
    return schedules
      .filter((schedule) => schedule.status !== "Inactive")
      .filter((schedule) =>
        filterInput
          ? schedule.country &&
            schedule.country.toLowerCase().includes(filterInput.toLowerCase())
          : true
      );
  }, [schedules, filterInput]);

  const handleEdit = (row) => {
    setSelectedSchedule(row.original);
    onOpen();
  };

  const handleHidden = (row) => {
    setSelectedSchedule(row.original);
    onAlertOpen(); // Mở modal xác nhận
  };

  // const confirmHidden = () => {
  //   dispatch(hiddenSchedule(selectedSchedule.id));
  //   onAlertClose(); // Đóng modal sau khi ẩn lịch chiếu
  //   dispatch(fetchSchedules());
  // };

  const columnsWithActions = useMemo(
    () => [
      ...columns,
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div>
            <Button
              colorScheme="blue"
              mr={2}
              onClick={() => handleEdit(row)}
            >
              Edit
            </Button>
            <Button
              colorScheme="red"
              onClick={() => handleHidden(row)}
            >
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
            Schedules
          </Text>
          <Menu></Menu>
        </Flex>
        <Flex mb="20px" px="25px" justify="space-between" align="center">
          <Select
            placeholder="Filter by country"
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
            maxW="300px"
          >
            {country.map((coun) => (
              <option key={coun} value={coun}>
                {coun}
              </option>
            ))}
          </Select>
        </Flex>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text className="text-red-500">{error}</Text>
        ) : (
          <>
            <Table
              {...getTableProps()}
              className="table-auto w-full"
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
                        className="text-left px-4 py-2 border-b border-gray-200"
                        key={index}
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
                          className="px-4 py-2 border-b border-gray-200"
                          key={index}
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

      {/* Modal Alert */}
      <Modal isOpen={isAlertOpen} onClose={onAlertClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="lg" fontWeight="bold">
            Confirm Hide Schedule
          </ModalHeader>
          <ModalBody>
            <Text fontSize="md">
              Are you sure you want to hide the schedule for "
              <Text as="span" fontWeight="bold">
                {selectedSchedule?.title}
              </Text>
              "? This action cannot be undone.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={() => "Hello"} mr={3}>
              Hide
            </Button>
            <Button onClick={onAlertClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {selectedSchedule && (
        <EditScheduleForm
          isOpen={isOpen}
          onClose={onClose}
          scheduleId={selectedSchedule.id}
          fetchSchedules={fetchSchedules}
        />
      )}
    </>
  );
}
