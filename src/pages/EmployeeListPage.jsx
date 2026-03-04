import React, { useMemo, useState } from "react";
import {
  useDeleteEmployeeMutation,
  useGetEmployeeQuery,
} from "../services/employeeApi";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import EmployeeTable from "../components/EmployeeTable";
import { useGetCountriesQuery } from "../services/countryApi";
import AddIcon from "@mui/icons-material/Add";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const EmployeeListPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: employees, isLoading, error } = useGetEmployeeQuery();
  const { data: countries, isLoading: contryLoading } = useGetCountriesQuery();
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const getCountryName = (id) => countries?.find((c) => c.id === id)?.name || "N/A";

  const filteredEmployee = useMemo(() => {
    if (!searchTerm) return employees;

    return employees.filter(
      (emp) =>
        emp.id.toString().includes(searchTerm) ||
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [employees, searchTerm]);

  const handleDelete = async (id) => {
    await deleteEmployee(id);
  };

  // if (isLoading || contryLoading) return <p>Loading...</p>;
  if (error) return <h1>error</h1>;
  return (
    <>
      <Box className="fade-in">
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'DM Serif Display', serif",
                fontWeight: 400,
                color: "text.primary",
                mb: 0.5,
              }}
            >
              Employees
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {employees?.length} {employees?.length === 1 ? "record" : "records"}{" "}
              in total
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate("/employees/new")}
            sx={{ mt: 0.5 }}
          >
            Add Employee
          </Button>
        </Box>
        <Box sx={{mb:5}}>
          <TextField
            label="Search by ID or Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{ width: { xs: "100%", sm: 400 } }}
          />
        </Box>
      </Box>
     {isLoading || contryLoading ? (
        <LoadingSpinner message="Loading employees..." />
      ) : (
        <EmployeeTable
          employees={filteredEmployee}
          getCountryName={getCountryName}
          onDelete={handleDelete}
          onEdit={(id) => navigate(`/edit/${id}`)}
          searchTerm={searchTerm}
        />
      )}
      {/* {filteredEmployee?.length === 0 && <h1>No Records found</h1>} */}
    </>
  );
};

export default EmployeeListPage;
