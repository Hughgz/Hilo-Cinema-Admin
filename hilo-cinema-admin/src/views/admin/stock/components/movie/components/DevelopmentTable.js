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
import { fetchMovies } from "reduxHilo/actions/movieAction";
import Card from "components/card/Card";
import Menu from "components/menu/MovieMenu";
import EditMovieForm from "./EditMovieModal";
import { hiddenMovie } from "reduxHilo/actions/movieAction";

export default function DevelopmentTable(props) {
  const { columnsData } = props;
  const columns = useMemo(() => columnsData, [columnsData]);

  const dispatch = useDispatch();
  const { loading, movies, error } = useSelector((state) => state.movie);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [filterInput, setFilterInput] = useState("");

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const country = useMemo(() => {
    const countrySet = new Set();
    movies.forEach((movie) => {
      if (movie.country) {
        countrySet.add(movie.country);
      }
    });
    return Array.from(countrySet);
  }, [movies]);

  const data = useMemo(() => {
    return movies
      .filter(movie => movie.status !== "inactive")
      .filter((movie) =>
        filterInput
          ? movie.country &&
            movie.country.toLowerCase().includes(filterInput.toLowerCase())
          : true
      );
  }, [movies, filterInput]);

  const handleEdit = (row) => {
    console.log(row.original.id)
    setSelectedMovie(row.original);
    onOpen();
  };

  const handleHidden = (row) => {
    dispatch(hiddenMovie(row.original.id));
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
            <Button onClick={() => handleHidden(row)} colorScheme="red">
              Hidden
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
    <>
      <Card direction="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Flex px="25px" justify="space-between" mb="20px" align="center">
          <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
            Movies
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

      {selectedMovie && (
        <EditMovieForm
          isOpen={isOpen}
          onClose={onClose}
          movieId={selectedMovie.id}
          fetchMovies={fetchMovies}
        />
      )}
    </>
  );
}
