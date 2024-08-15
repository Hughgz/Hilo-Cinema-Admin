import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editMovie, fetchMovies } from 'reduxHilo/actions/movieAction'; // Chỉnh sửa import actions
import { useParams, useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';

const EditMovieForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const movie = useSelector(state =>
    state.movie.movies.find(mov => mov.id === parseInt(id))
  );

  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    releasedDate: '',
    rate: '',
    country: '',
    director: '',
    description: '',
    movieType: '',
    trailer: '',
    status: '',
  });

  useEffect(() => {
    if (!movie) {
      dispatch(fetchMovies());
    } else {
      setFormData({
        ...movie,
      });
    }
  }, [movie, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editMovie(id, formData)); // Sử dụng action editMovie để chỉnh sửa
    alert("Cập nhật thông tin phim thành công");
    history.push('/admin/default'); // Điều hướng đến trang mặc định sau khi chỉnh sửa
  };

  const handleBack = () => {
    history.goBack();
  };

  const formBackgroundColor = useColorModeValue('white', 'gray.700');
  const inputBackgroundColor = useColorModeValue('gray.100', 'gray.600');
  const textColor = useColorModeValue("black", "white");

  return (
    <Flex
      align="center"
      justify="center"
      bg={useColorModeValue("secondaryGray.300", "whiteAlpha.100")}
      minH="100vh"
      py={12}
      px={6}
    >
      <Box
        rounded="lg"
        bg={formBackgroundColor}
        boxShadow="lg"
        p={8}
        width="full"
        maxW="md"
      >
        <Heading fontSize="2xl" mb="4" textAlign="center" color={textColor}>
          Edit Movie
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="title">
              <FormLabel color={textColor}>Title</FormLabel>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                bg={inputBackgroundColor}
                border={0}
                color={textColor}
                _placeholder={{ color: 'gray.500' }}
              />
            </FormControl>
            <FormControl id="duration">
              <FormLabel color={textColor}>Duration (minutes)</FormLabel>
              <Input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                bg={inputBackgroundColor}
                border={0}
                color={textColor}
                _placeholder={{ color: 'gray.500' }}
              />
            </FormControl>
            <FormControl id="releasedDate">
              <FormLabel color={textColor}>Released Date</FormLabel>
              <Input
                type="date"
                name="releasedDate"
                value={formData.releasedDate}
                onChange={handleChange}
                bg={inputBackgroundColor}
                border={0}
                color={textColor}
                _placeholder={{ color: 'gray.500' }}
              />
            </FormControl>
            <FormControl id="rate">
              <FormLabel color={textColor}>Rate</FormLabel>
              <Input
                type="number"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                step="0.1"
                min="0"
                max="10"
                bg={inputBackgroundColor}
                border={0}
                color={textColor}
                _placeholder={{ color: 'gray.500' }}
              />
            </FormControl>
            <FormControl id="country">
              <FormLabel color={textColor}>Country</FormLabel>
              <Input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                bg={inputBackgroundColor}
                border={0}
                color={textColor}
                _placeholder={{ color: 'gray.500' }}
              />
            </FormControl>
            <FormControl id="director">
              <FormLabel color={textColor}>Director</FormLabel>
              <Input
                type="text"
                name="director"
                value={formData.director}
                onChange={handleChange}
                bg={inputBackgroundColor}
                border={0}
                color={textColor}
                _placeholder={{ color: 'gray.500' }}
              />
            </FormControl>
            <FormControl id="description">
              <FormLabel color={textColor}>Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                bg={inputBackgroundColor}
                border={0}
                color={textColor}
                _placeholder={{ color: 'gray.500' }}
              />
            </FormControl>
            <FormControl id="movieType">
              <FormLabel color={textColor}>Movie Type</FormLabel>
              <Input
                type="text"
                name="movieType"
                value={formData.movieType}
                onChange={handleChange}
                bg={inputBackgroundColor}
                border={0}
                color={textColor}
                _placeholder={{ color: 'gray.500' }}
              />
            </FormControl>
            <FormControl id="trailer">
              <FormLabel color={textColor}>Trailer URL</FormLabel>
              <Input
                type="url"
                name="trailer"
                value={formData.trailer}
                onChange={handleChange}
                bg={inputBackgroundColor}
                border={0}
                color={textColor}
                _placeholder={{ color: 'gray.500' }}
              />
            </FormControl>
            <FormControl id="status">
              <FormLabel color={textColor}>Status</FormLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                bg={inputBackgroundColor}
                border={0}
                color={textColor}
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </Select>
            </FormControl>
            <Flex direction="row" justifyContent="space-between">
              <Button onClick={handleBack} colorScheme="gray" size="lg" fontSize="md" w="48%">
                Back
              </Button>
              <Button type="submit" colorScheme="blue" size="lg" fontSize="md" w="48%">
                Edit
              </Button>
            </Flex>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default EditMovieForm;
