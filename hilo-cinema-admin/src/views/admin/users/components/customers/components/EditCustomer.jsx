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
  Select,
  Stack,
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
      setFormData({
        ...employee,
        password: '', // Initialize password as empty for security reasons
      });
    }
  }, [employee, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === '') {
      // If no new password has been entered, don't send it for update
      const { password, ...updateData } = formData;
      dispatch(editEmployee(id, updateData));
    } else {
      dispatch(editEmployee(id, formData));
    }
    alert("Cập nhật thông tin nhân viên thành công");
    history.push('/admin/default');
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
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                bg={inputBackgroundColor}
                border={0}
                color={textColor}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>
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
                placeholder="Enter new password to change"
                onChange={handleChange}
                bg={inputBackgroundColor}
                border={0}
                color={textColor}
                _placeholder={{ color: 'gray.500' }}
              />
            </FormControl>
            <FormControl id="position">
              <FormLabel color={textColor}>Position</FormLabel>
              <Select
                name="position"
                value={formData.position}
                onChange={handleChange}
                bg={inputBackgroundColor}
                border={0}
                color={textColor}
              >
                <option value="Manager">Manager</option>
                <option value="Ticket Seller">Ticket Seller</option>
                <option value="Ticket Checker">Ticket Checker</option>
                <option value="Technician">Technician</option>
                <option value="Cleaner">Cleaner</option>
                <option value="Security Guard">Security Guard</option>
              </Select>
            </FormControl>
            <FormControl id="sysRole">
              <FormLabel color={textColor}>System Role</FormLabel>
              <Select
                name="sysRole"
                value={formData.sysRole}
                onChange={handleChange}
                bg={inputBackgroundColor}
                border={0}
                color={textColor}
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Staff">Staff</option>
              </Select>
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
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
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

export default EditEmployeeForm
