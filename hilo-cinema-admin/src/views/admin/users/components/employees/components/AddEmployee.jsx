import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
import axios from "axios";
import PropTypes from "prop-types";
import { addEmployee, fetchEmployees } from "reduxHilo/actions/employeeAction";

const AddEmployeeForm = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();

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

    const validate = () => {
        let validationErrors = {};

        if (!formData.name) validationErrors.name = 'Name is required';
        if (!formData.email) {
            validationErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = 'Email address is invalid';
        }
        if (!formData.phone) validationErrors.phone = 'Phone number is required';
        if (!formData.address) validationErrors.address = 'Address is required';
        if (!formData.gender) validationErrors.gender = 'Gender is required';
        if (!formData.birthdate) validationErrors.birthdate = 'Birthdate is required';
        if (!formData.password) validationErrors.password = 'Password is required';
        if (!formData.position) validationErrors.position = 'Position is required';
        if (!formData.sysRole) validationErrors.sysRole = 'System role is required';
        if (!formData.status) validationErrors.status = 'Status is required';

        return validationErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });  // Clear error when user starts typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            try {
                await dispatch(addEmployee(formData));
                alert("Employee added successfully");
                onClose(); // Close modal after success
                dispatch(fetchEmployees()); // Refresh employee list
            } catch (error) {
                if (error.response && error.response.data.message.includes('Email already exists')) {
                    setErrors({ email: 'Email already exists. Please try another email.' });
                } else {
                    alert("An unexpected error occurred. Please try again.");
                }
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
                <ModalHeader>Add New Employee</ModalHeader>
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
                                    _placeholder={{ color: "gray.500" }}
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
                                    _placeholder={{ color: "gray.500" }}
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
                                    _placeholder={{ color: "gray.500" }}
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
                                    _placeholder={{ color: "gray.500" }}
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
                                    <option value="">Select Gender</option>
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
                                    _placeholder={{ color: "gray.500" }}
                                />
                                {errors.birthdate && <FormErrorMessage>{errors.birthdate}</FormErrorMessage>}
                            </FormControl>
                            <FormControl id="password" isInvalid={errors.password}>
                                <FormLabel color={textColor}>Password</FormLabel>
                                <Input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    bg={inputBackgroundColor}
                                    border={0}
                                    color={textColor}
                                    _placeholder={{ color: "gray.500" }}
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
                                <FormLabel color={textColor}>System Role</FormLabel>
                                <Select
                                    name="sysRole"
                                    value={formData.sysRole}
                                    onChange={handleChange}
                                    bg={inputBackgroundColor}
                                    border={0}
                                    color={textColor}
                                >
                                    <option value="">Select System Role</option>
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
                                    <option value="">Select Status</option>
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

AddEmployeeForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AddEmployeeForm;
