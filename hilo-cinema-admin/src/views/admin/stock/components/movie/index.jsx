// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/stock/components/movie/components/DevelopmentTable";
import CheckTable from "views/admin/stock/components/movie/components/CheckTable";
import ColumnsTable from "views/admin/stock/components/movie/components/ColumnsTable";
import ComplexTable from "views/admin/stock/components/movie/components/ComplexTable";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/admin/stock/components/movie/variables/columnsData";
import tableDataDevelopment from "views/admin/stock/components/movie/variables/tableDataDevelopment.json";
import tableDataCheck from "views/admin/stock/components/movie/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/stock/components/movie/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/stock/components/movie/variables/tableDataComplex.json";
import React from "react";

export default function UserManagement() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      </SimpleGrid>
    </Box>
  );
}
