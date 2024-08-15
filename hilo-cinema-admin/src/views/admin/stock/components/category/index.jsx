// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/stock/components/category/components/DevelopmentTable";
import {
  columnsDataDevelopment
} from "views/admin/stock/components/category/variables/columnsData";
import tableDataDevelopment from "views/admin/stock/components/category/variables/tableDataDevelopment.json";
import React from "react";

export default function Categories() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
      </SimpleGrid>
    </Box>
  );
}
