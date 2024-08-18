import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { fetchTotalInvoiceByCustomerId } from 'reduxHilo/actions/invoiceAction';

const TopCustomerTable = ({ customers, loading, error }) => {
  const [sortedCustomers, setSortedCustomers] = useState([]);
  const [totals, setTotals] = useState({});
  const dispatch = useDispatch();
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  useEffect(() => {
    const fetchTotals = async () => {
      const totalsData = {};
      for (let customer of customers) {
        const total = await dispatch(fetchTotalInvoiceByCustomerId(customer.id));
        totalsData[customer.id] = total;
      }
      setTotals(totalsData);

      // Sau khi đã có totals, sắp xếp khách hàng dựa trên tổng số tiền
      const sorted = [...customers].sort((a, b) => {
        const totalA = totalsData[a.id] || 0;
        const totalB = totalsData[b.id] || 0;
        return totalB - totalA; // Sắp xếp giảm dần
      });
      setSortedCustomers(sorted);
    };

    if (customers.length > 0) {
      fetchTotals();
    }
  }, [customers, dispatch]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Box color="red">{error}</Box>;
  }

  return (
    <Flex
      direction="column"
      w="100%"
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
      <Flex
        align={{ sm: 'flex-start', lg: 'center' }}
        justify="space-between"
        w="100%"
        px="22px"
        pb="20px"
        mb="10px"
        boxShadow="0px 40px 58px -20px rgba(112, 144, 176, 0.26)"
      >
        <Text color={textColor} fontSize="xl" fontWeight="600">
          Top Customers
        </Text>
        <Button variant="action">See all</Button>
      </Flex>
      <Box>
        <Table variant="simple" color="gray.500" mt="12px">
          <Thead color={textColor}>
            <Tr>
              <Th>Name</Th>
              <Th>Gender</Th>
              <Th>Total</Th> {/* Cột Total */}
            </Tr>
          </Thead>
          <Tbody color={textColor}>
            {sortedCustomers.map((customer) => (
              <Tr key={customer.id}>
                <Td>{customer.name}</Td>
                <Td>{customer.gender}</Td>
                <Td>{totals[customer.id] || 0}</Td> {/* Hiển thị tổng số tiền */}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default TopCustomerTable;
