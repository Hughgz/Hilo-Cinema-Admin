import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editEmployee, fetchEmployees } from 'reduxHilo/actions/employeeAction';
import { useParams, useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const EditEmployeeForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const employee = useSelector(state =>
    state.employee.employees.find(emp => emp.id === parseInt(id))
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    birthdate: '',
    password: '',
    position: '',
    sysRole: '',
    token: '',
    createdDate: '',
    status: '',
  });

  useEffect(() => {
    if (!employee) {
      dispatch(fetchEmployees());
    } else {
      setFormData(employee);
    }
  }, [employee, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editEmployee(id, formData)).then(() => {
      alert("Cập nhật thông tin nhân viên thành công");
      history.push('/admin/default'); // Điều hướng về trang danh sách nhân viên
    });
  };
  const formBackgroundColor = useColorModeValue('white', 'gray.700');
  const inputBackgroundColor = useColorModeValue('gray.100', 'gray.600');
  const textColor = "white";
  return (
    <Flex
    align="center"
    justify="center"
    bg={useColorModeValue('gray.50', 'gray.800')}
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
        Edit Employee
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="name">
            <FormLabel color={textColor}>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              bg={inputBackgroundColor}
              border={0}
              color={textColor}
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel color={textColor}>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              bg={inputBackgroundColor}
              border={0}
              color={textColor}
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          <FormControl id="phone">
            <FormLabel color={textColor}>Phone</FormLabel>
            <Input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              bg={inputBackgroundColor}
              border={0}
              color={textColor}
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          <FormControl id="address">
            <FormLabel color={textColor}>Address</FormLabel>
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              bg={inputBackgroundColor}
              border={0}
              color={textColor}
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          <FormControl id="gender">
            <FormLabel color={textColor}>Gender</FormLabel>
            <Input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              bg={inputBackgroundColor}
              border={0}
              color={textColor}
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          <FormControl id="birthdate">
            <FormLabel color={textColor}>Birthdate</FormLabel>
            <Input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              bg={inputBackgroundColor}
              border={0}
              color={textColor}
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel color={textColor}>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              bg={inputBackgroundColor}
              border={0}
              color={textColor}
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          <FormControl id="position">
            <FormLabel color={textColor}>Position</FormLabel>
            <Input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              bg={inputBackgroundColor}
              border={0}
              color={textColor}
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          <FormControl id="sysRole">
            <FormLabel color={textColor}>SysRole</FormLabel>
            <Input
              type="text"
              name="sysRole"
              value={formData.sysRole}
              onChange={handleChange}
              bg={inputBackgroundColor}
              border={0}
              color={textColor}
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          <FormControl id="token">
            <FormLabel color={textColor}>Token</FormLabel>
            <Input
              type="text"
              name="token"
              value={formData.token}
              onChange={handleChange}
              bg={inputBackgroundColor}
              border={0}
              color={textColor}
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          <FormControl id="createdDate">
            <FormLabel color={textColor}>Created Date</FormLabel>
            <Input
              type="datetime-local"
              name="createdDate"
              value={formData.createdDate}
              onChange={handleChange}
              bg={inputBackgroundColor}
              border={0}
              color={textColor}
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          <FormControl id="status">
            <FormLabel color={textColor}>Status</FormLabel>
            <Input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              bg={inputBackgroundColor}
              border={0}
              color={textColor}
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
            Update
          </Button>
        </Stack>
      </form>
    </Box>
  </Flex>
  );
};

export default EditEmployeeForm;
