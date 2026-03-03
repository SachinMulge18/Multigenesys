import React, { useMemo, useState } from "react";
import { useDeleteEmployeeMutation, useGetEmployeeQuery } from "../services/employeeApi";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, TextField } from "@mui/material";
import EmployeeTable from "../components/EmployeeTable";
import { useGetCountriesQuery } from "../services/countryApi";

const EmployeeListPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: employees, isLoading, error } = useGetEmployeeQuery();
  const { data: countries, isLoading: contryLoading } = useGetCountriesQuery();
  const [deleteEmployee] = useDeleteEmployeeMutation()

  const getCountryName = (id) => countries?.find((c) => c.id === id)?.name || "N/A";

  const filteredEmployee = useMemo(() => {
    if (!searchTerm) return employees;

    return employees.filter(
      (emp) =>
        emp.id.toString().includes(searchTerm) ||
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [employees, searchTerm]);

  const handleDelete = async (id) => { await deleteEmployee(id);};

  if (isLoading || contryLoading) return <p>Loading...</p>;
  if (error) return <h1>error</h1>;
  return (
    <>
      <Box sx={{ py: 2 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          mb={3}
        >
          <Button
            variant="contained"
            onClick={() => navigate("/add")}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Add Employee
          </Button>

          <TextField
            label="Search by ID or Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{ width: { xs: "100%", sm: 300 } }}
          />
        </Stack>
      </Box>
      <EmployeeTable
        employees={filteredEmployee}
        getCountryName={getCountryName}
        onDelete={handleDelete}
        onEdit={(id) => navigate(`/edit/${id}`)}
      />
      {filteredEmployee.length === 0 && <h1>No Records found</h1>}
    </>
  );
};

export default EmployeeListPage;
