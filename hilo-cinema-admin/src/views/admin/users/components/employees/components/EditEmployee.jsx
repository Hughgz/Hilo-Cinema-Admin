import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchemployeeDetails, editemployee } from "reduxHilo/actions/employeeAction";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useColorModeValue,
  FormErrorMessage,
  Stack,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { fetchEmployeeById } from "reduxHilo/actions/employeeAction";
import { editEmployee } from "reduxHilo/actions/employeeAction";

const EditEmployeeForm = ({ isOpen, onClose, fetchEmployees, employeeId }) => {
  const dispatch = useDispatch();
  const employee = useSelector((state) =>
    state.employee.employees.find((t) => t.id === employeeId)
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
    status: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData({ ...employee });
    } else {
      dispatch(fetchEmployeeById(employeeId));
    }
  }, [employee, employeeId, dispatch]);

  const validate = () => {
    let validationErrors = {};

    if (!formData.name) validationErrors.name = 'Name is required';
    if (!formData.email) validationErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) validationErrors.email = 'Email address is invalid';
    if (!formData.phone) validationErrors.phone = 'Phone number is required';
    if (!formData.address) validationErrors.address = 'Address is required';
    if (!formData.gender) validationErrors.gender = 'Gender is required';
    if (!formData.birthdate) validationErrors.birthdate = 'Birthdate is required';
    if (!formData.position) validationErrors.position = 'Position is required';
    if (!formData.sysRole) validationErrors.sysRole = 'System role is required';
    if (!formData.status) validationErrors.status = 'Status is required';

    return validationErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        await dispatch(editEmployee(employeeId, formData)); // Update with theater details
        alert("Cập nhật rạp chiếu phim thành công");
        onClose(); // Close modal after successful update
        fetchEmployees(); // Refresh the employee list
      } catch (error) {
        console.error("Error updating employee:", error.response ? error.response.data : error.message);
      }
    }
  };

  const formBackgroundColor = useColorModeValue("white", "gray.700");
  const inputBackgroundColor = useColorModeValue("gray.100", "gray.600");
  const textColor = useColorModeValue("black", "white");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit employee</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="name" isInvalid={errors.name}>
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
                {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
              </FormControl>
              <FormControl id="email" isInvalid={errors.email}>
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
                {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
              </FormControl>
              <FormControl id="phone" isInvalid={errors.phone}>
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
                {errors.phone && <FormErrorMessage>{errors.phone}</FormErrorMessage>}
              </FormControl>
              <FormControl id="address" isInvalid={errors.address}>
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
                {errors.address && <FormErrorMessage>{errors.address}</FormErrorMessage>}
              </FormControl>
              <FormControl id="gender" isInvalid={errors.gender}>
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
                {errors.gender && <FormErrorMessage>{errors.gender}</FormErrorMessage>}
              </FormControl>
              <FormControl id="birthdate" isInvalid={errors.birthdate}>
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
                {errors.birthdate && <FormErrorMessage>{errors.birthdate}</FormErrorMessage>}
              </FormControl>
              <FormControl id="password" isInvalid={errors.password}>
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
                {errors.password && <FormErrorMessage>{errors.password}</FormErrorMessage>}
              </FormControl>
              <FormControl id="position" isInvalid={errors.position}>
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
                {errors.position && <FormErrorMessage>{errors.position}</FormErrorMessage>}
              </FormControl>
              <FormControl id="sysRole" isInvalid={errors.sysRole}>
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
                  <option value="Employee">Employee</option>
                </Select>
                {errors.sysRole && <FormErrorMessage>{errors.sysRole}</FormErrorMessage>}
              </FormControl>
              <FormControl id="status" isInvalid={errors.status}>
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
                </Select>
                {errors.status && <FormErrorMessage>{errors.status}</FormErrorMessage>}
              </FormControl>
            </Stack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

EditEmployeeForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  employeeId: PropTypes.string.isRequired,
  fetchEmployees: PropTypes.func.isRequired,
};

export default EditEmployeeForm;
