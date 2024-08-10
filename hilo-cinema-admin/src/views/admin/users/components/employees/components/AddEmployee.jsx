import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from 'reduxHilo/actions/employeeAction';
import { useHistory } from 'react-router-dom';
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
  useColorModeValue,
  useToast,
  Text
} from '@chakra-ui/react';

const AddEmployeeForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const toast = useToast();

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
    status: '',
  });

  const [emailError, setEmailError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'email') setEmailError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addEmployee(formData));
      toast({
        title: "Employee Added",
        description: "The employee has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      history.push('/admin/default');
    } catch (error) {
      // Assuming the backend error message for an existing email is standardized
      if (error.response && error.response.data.message.includes('Email already exists')) {
        setEmailError('Email already exists. Please try another email.');
      } else {
        toast({
          title: "Error",
          description: error.message || "An unexpected error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Flex
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
      minH="100vh"
      py={12}
      px={6}
    >
      <Box
        rounded="lg"
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow="lg"
        p={8}
        width="full"
        maxW="md"
      >
        <Heading fontSize="2xl" textAlign="center" color={useColorModeValue("gray.800", "white")}>
          Add Employee
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="email" isInvalid={!!emailError}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {emailError && <Text color="red.500" mt={2}>{emailError}</Text>}
            </FormControl>
            <FormControl id="phone">
              <FormLabel>Phone</FormLabel>
              <Input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="address">
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="gender">
              <FormLabel>Gender</FormLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>
            </FormControl>
            <FormControl id="birthdate">
              <FormLabel>Birthdate</FormLabel>
              <Input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="position">
              <FormLabel>Position</FormLabel>
              <Select
                name="position"
                value={formData.position}
                onChange={handleChange}
              >
                <option value="">Select Position</option>
                <option value="Manager">Manager</option>
                <option value="Ticket Seller">Ticket Seller</option>
                <option value="Ticket Checker">Ticket Checker</option>
                <option value="Technician">Technician</option>
                <option value="Cleaner">Cleaner</option>
                <option value="Security Guard">Security Guard</option>
              </Select>
            </FormControl>
            <FormControl id="sysRole">
              <FormLabel>System Role</FormLabel>
              <Select
                name="sysRole"
                value={formData.sysRole}
                onChange={handleChange}
              >
                <option value="">Select System Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Manager">Manager</option>
                <option value="Staff">Staff</option>
                <option value="Technician">Technician</option>
                <option value="Cleaner">Cleaner</option>
                <option value="Security Guard">Security Guard</option>
              </Select>
            </FormControl>
            <FormControl id="status">
              <FormLabel>Status</FormLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </Select>
            </FormControl>
            <Flex direction="row" justifyContent="space-between">
              <Button onClick={() => history.goBack()} colorScheme="gray" size="lg" w="48%">
                Back
              </Button>
              <Button type="submit" colorScheme="blue" size="lg" w="48%">
                Add
              </Button>
            </Flex>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default AddEmployeeForm;
