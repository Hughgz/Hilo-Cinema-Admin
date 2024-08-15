import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import HistoryItem from "views/admin/sales/components/HistoryItem";
import NFT from "components/card/NFT";
import Card from "components/card/Card.js";
import dataMovie from "./variables/dataMovie.json";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
import tableDataConcessions from "views/admin/sales/variables/tableDataConcessions.json";
import { useDispatch, useSelector } from "react-redux";
import TopCreatorTable from "./components/TableTopCreators";
import { fetchCustomers } from "reduxHilo/actions/customerAction";
import Banner from "./components/Banner";
import { fetchRooms } from "reduxHilo/actions/roomAction";
import AddRoomForm from "./components/AddRoomForm";

export default function Sales() {

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");

  // Redux
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const { user, token } = useSelector((state) => state.auth); // Sử dụng token từ authReducer
  const { loading, customers, error } = useSelector((state) => state.customer);

  const [selectedRoom, setSelectedRoom] = useState("");
  const { rooms } = useSelector((state) => state.room);

  useEffect(() => {
    if (token) { // Chỉ dispatch nếu đã có token
      dispatch(fetchRooms());
      dispatch(fetchCustomers());
      setMovies(dataMovie);
    }
  }, [dispatch, token]);

  const handleRoomChange = (e) => {
    const selectedRoomId = parseInt(e.target.value, 10);
    const room = rooms.find((room) => room.id === selectedRoomId);
    setSelectedRoom(room);
  };

  const roomOptions = useMemo(() => {
    return rooms.map((room) => ({
      value: room.id,
      label: `${room.name} - ${room.theaterName || 'Unknown Theater'}`
    }));
  }, [rooms]);
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

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
          {/* Combo Boxes */}
          <Flex mb={4}>
            <Select placeholder="Select Schedule" mr={4}>

            </Select>
            <Select placeholder="Select Room" onChange={handleRoomChange} mr={4}>
              {roomOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            <Button
              bg="transparent"
              color="blue.500"
              border="1px solid"
              borderColor="blue.500"
              _hover={{ bg: "blue.500", color: "white" }}
              _active={{ bg: "blue.600", color: "white" }}
              borderRadius="md"
              boxShadow="md"
              px={6}
              py={3}
              onClick={onModalOpen} // Mở modal khi nhấn vào nút Add Room
            >
              Add Room
            </Button>
          </Flex>
          {selectedRoom && (
            <Banner
              roomId={selectedRoom.id}
              rowNum={selectedRoom.rowNum}
              colNum={selectedRoom.colNum}
            />// Pass the selected room's data to Banner
          )}
          <Flex direction="column" mt={5}>
            <Flex
              mt="45px"
              mb="20px"
              justifyContent="space-between"
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}
            >
              <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
                Trending Movies
              </Text>
              <Flex
                align="center"
                me="20px"
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}
              >
                <Link
                  color={textColorBrand}
                  fontWeight="500"
                  me={{ base: "34px", md: "44px" }}
                  to="#art"
                >
                  Art
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight="500"
                  me={{ base: "34px", md: "44px" }}
                  to="#music"
                >
                  Music
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight="500"
                  me={{ base: "34px", md: "44px" }}
                  to="#collectibles"
                >
                  Collectibles
                </Link>
                <Link color={textColorBrand} fontWeight="500" to="#sports">
                  Sports
                </Link>
              </Flex>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
              {movies.map((movie, index) => (
                <NFT
                  key={index}
                  name={movie.title}
                  author={`By ${movie.director}`}
                  bidders={[
                    Avatar1,
                    Avatar2,
                    Avatar3,
                    Avatar4,
                    Avatar1,
                    Avatar1,
                    Avatar1,
                    Avatar1,
                  ]}
                  image={movie.imgSmall}
                  rate={`${movie.rate} / 10`}
                  download={movie.trailer}
                />
              ))}
            </SimpleGrid>
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
        >
          <Card px="0px" mb="20px">
            <TopCreatorTable customers={customers} loading={loading} error={error} />
          </Card>
          <Card p="0px">
            <Flex
              align={{ sm: "flex-start", lg: "center" }}
              justify="space-between"
              w="100%"
              px="22px"
              py="18px"
            >
              <Text color="textColor" fontSize="xl" fontWeight="600">
                Concessions
              </Text>
              <Button variant="action">See all</Button>
            </Flex>

            {tableDataConcessions.map((item, index) => (
              <HistoryItem key={index} name={item.name} image={item.image} cost={item.cost} />
            ))}
          </Card>
        </Flex>
      </Grid>
      <AddRoomForm
        isOpen={isModalOpen}
        onClose={onModalClose}
        fetchRooms={() => dispatch(fetchRooms())} // Implement fetchRooms nếu cần
      />
    </Box>
  );
}
