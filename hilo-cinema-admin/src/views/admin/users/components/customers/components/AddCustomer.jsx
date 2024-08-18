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
  Text,
  FormErrorMessage
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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });  // Clear error when user starts typing
  };

  const validate = () => {
    let validationErrors = {};

    if (!formData.name) {
      validationErrors.name = 'Name is required';
    }
    if (!formData.email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Email address is invalid';
    }
    if (!formData.phone) {
      validationErrors.phone = 'Phone number is required';
    }
    if (!formData.address) {
      validationErrors.address = 'Address is required';
    }
    if (!formData.gender) {
      validationErrors.gender = 'Gender is required';
    }
    if (!formData.birthdate) {
      validationErrors.birthdate = 'Birthdate is required';
    }
    if (!formData.password) {
      validationErrors.password = 'Password is required';
    }
    if (!formData.position) {
      validationErrors.position = 'Position is required';
    }
    if (!formData.sysRole) {
      validationErrors.sysRole = 'System role is required';
    }
    if (!formData.status) {
      validationErrors.status = 'Status is required';
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
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
        if (error.response && error.response.data.message.includes('Email already exists')) {
          setErrors({ email: 'Email already exists. Please try another email.' });
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
            <FormControl id="name" isInvalid={errors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
            </FormControl>
            <FormControl id="email" isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
            </FormControl>
            <FormControl id="phone" isInvalid={errors.phone}>
              <FormLabel>Phone</FormLabel>
              <Input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <FormErrorMessage>{errors.phone}</FormErrorMessage>}
            </FormControl>
            <FormControl id="address" isInvalid={errors.address}>
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <FormErrorMessage>{errors.address}</FormErrorMessage>}
            </FormControl>
            <FormControl id="gender" isInvalid={errors.gender}>
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
              {errors.gender && <FormErrorMessage>{errors.gender}</FormErrorMessage>}
            </FormControl>
            <FormControl id="birthdate" isInvalid={errors.birthdate}>
              <FormLabel>Birthdate</FormLabel>
              <Input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
              />
              {errors.birthdate && <FormErrorMessage>{errors.birthdate}</FormErrorMessage>}
            </FormControl>
            <FormControl id="password" isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <FormErrorMessage>{errors.password}</FormErrorMessage>}
            </FormControl>
            <FormControl id="position" isInvalid={errors.position}>
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
              {errors.position && <FormErrorMessage>{errors.position}</FormErrorMessage>}
            </FormControl>
            <FormControl id="sysRole" isInvalid={errors.sysRole}>
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
              {errors.sysRole && <FormErrorMessage>{errors.sysRole}</FormErrorMessage>}
            </FormControl>
            <FormControl id="status" isInvalid={errors.status}>
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
              {errors.status && <FormErrorMessage>{errors.status}</FormErrorMessage>}
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
