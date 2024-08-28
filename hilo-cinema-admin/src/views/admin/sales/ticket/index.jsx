import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  Text,
  Select,
  Button,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "reduxHilo/actions/customerAction";
import { fetchRooms } from "reduxHilo/actions/roomAction";
import { fetchTheaters } from "reduxHilo/actions/theaterAction";
import { fetchMovies } from "reduxHilo/actions/movieAction";
import { fetchSchedulesByMovieId, clearSchedules } from "reduxHilo/actions/scheduleAction";
import TopCustomerTable from "./components/TableTopCustomers";
import Card from "components/card/Card.js";
import tableDataConcessions from "views/admin/sales/ticket/variables/tableDataConcessions.json";
import SeatList from "./components/SeatList";
import Concessions from "./components/Concessions";
import TopFoodTable from "./components/Concessions";

export default function Ticket() {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movie);
  const { user, token } = useSelector((state) => state.auth);
  const { loading, customers, error } = useSelector((state) => state.customer);
  const { theaters } = useSelector((state) => state.theater);
  const { rooms } = useSelector((state) => state.room);
  const { schedules } = useSelector((state) => state.schedule);
  const { foods: foodData, loading: foodLoading, error: foodError } = useSelector((state) => state.food);

  const [selectedTheater, setSelectedTheater] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(fetchRooms());
      dispatch(fetchCustomers());
      dispatch(fetchTheaters());
      dispatch(fetchMovies());
    }
  }, [dispatch, token]);

  const handleTheaterChange = (e) => {
    const selectedTheaterId = parseInt(e.target.value, 10); 
    setSelectedTheater(selectedTheaterId);
    setSelectedMovie(null);
    setSelectedSchedule(null);
    setSelectedRoom(null);
  };

  const handleMovieChange = (e) => {
    const selectedMovieId = e.target.value;
    setSelectedMovie(selectedMovieId);
    setSelectedSchedule(null);
    setSelectedRoom(null);

    dispatch(clearSchedules());

    if (selectedMovieId) {
      dispatch(fetchSchedulesByMovieId(selectedMovieId))
        .then(response => {
          if (response && response.data && response.data.length > 0) {
            // Có lịch chiếu, không cần làm gì thêm
          } else {
            setSelectedSchedule(null);
          }
        })
        .catch(() => {
          setSelectedSchedule(null);
        });
    }
  };

  const handleScheduleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedSchedule(selectedValue);

    const selectedScheduleObj = schedules.find(
      (schedule) => `<span class="math-inline">\{schedule\.date\}\-</span>{schedule.time}` === selectedValue
    );

    if (selectedScheduleObj && selectedScheduleObj.roomId) {
      const filteredRooms = rooms.filter(
        (room) => room.id === selectedScheduleObj.roomId
      );
      setSelectedRoom(filteredRooms.length > 0 ? filteredRooms[0] : null); 
    } else {
      setSelectedRoom(null); 
    }
  };

  const handleRoomChange = (e) => {
    const selectedRoomId = parseInt(e.target.value, 10);
    const room = rooms.find((room) => room.id === selectedRoomId);
    setSelectedRoom(room);
  };

  const roomOptions = useMemo(() => {
    if (selectedTheater) {
      let filteredRooms = rooms.filter((room) => room.theaterId === selectedTheater);

      if (selectedSchedule) {
        const selectedScheduleObj = schedules.find(
          (schedule) => `<span class="math-inline">\{schedule\.date\}\-</span>{schedule.time}` === selectedSchedule
        );
        if (selectedScheduleObj && selectedScheduleObj.roomId) {
          filteredRooms = filteredRooms.filter(
            (room) => room.id === selectedScheduleObj.roomId
          );
        }
      }

      return filteredRooms.map((room) => ({
        value: room.id,
        label: `${room.name}`,
      }));
    }
    return [];
  }, [rooms, selectedTheater, selectedSchedule]);

  const theaterOptions = useMemo(() => {
    return theaters.map((theater) => ({
      value: theater.id,
      label: theater.name,
    }));
  }, [theaters]);

  const movieOptions = useMemo(() => {
    return movies.map((movie) => ({
      value: movie.id,
      label: movie.title,
    }));
  }, [movies]);

  const scheduleOptions = useMemo(() => {
    if (!selectedMovie || !schedules || schedules.length === 0) {
      return [];
    }
    return schedules.map((schedule) => ({
      value: `<span class="math-inline">\{schedule\.date\}\-</span>{schedule.time}`,
      label: `${schedule.date} - ${schedule.time}`,
      roomId: schedule.roomId,
    }));
  }, [schedules, selectedMovie]);

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
        >
          <Flex mb={4}>
            <Select
              placeholder="Select Theater"
              mr={4}
              onChange={handleTheaterChange}
            >
              {theaterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>

            <Select
              placeholder="Select Movie"
              mr={4}
              onChange={handleMovieChange}
              isDisabled={!selectedTheater}
            >
              {movieOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>

            <Select
              placeholder="Select Schedule"
              mr={4}
              onChange={handleScheduleChange}
              isDisabled={!selectedMovie || schedules.length === 0}
            >
              {scheduleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>

            <Select
              placeholder="Select Room"
              value={selectedRoom ? selectedRoom.id : ""}
              onChange={handleRoomChange}
              mr={4}
              isDisabled={!selectedSchedule}
            >
              {roomOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Flex>

          {selectedRoom && (
            <SeatList
              roomId={selectedRoom.id}
              rowNum={selectedRoom.rowNum}
              colNum={selectedRoom.colNum}
            />
          )}
        </Flex>

        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
        >
          <Card px="0px" mb="20px">
            <TopCustomerTable
              customers={customers}
              loading={loading}
              error={error}
            />
          </Card>
          <Card px="0px" mb="20px">
            <TopFoodTable 
              foods={foodData} 
              loading={foodLoading} 
              error={foodError} 
            /> 
          </Card>
        </Flex>
      </Grid>
    </Box>
  );
}