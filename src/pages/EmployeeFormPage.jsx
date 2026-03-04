/* eslint-disable no-unused-vars */
import {
  Box,
  Breadcrumbs,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Link,
  Divider,
  Grid,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useGetCountriesQuery } from "../services/countryApi";
import {
  useCreateEmployeeMutation,
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
} from "../services/employeeApi";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import ToastMessage from "../components/ui/ToastMessage";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const EmployeeFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const { data: employee, isLoading, error, } = useGetEmployeeByIdQuery(id, { skip: !id });
  const { data: countries, isLoading: contryLoading } = useGetCountriesQuery();
  const [createEmployee, { isLoading: isCreating }] = useCreateEmployeeMutation();
  const [updateEmployee, { isLoading: isUpdating }] = useUpdateEmployeeMutation();

  console.log(employee)

  const getCountryName = countries?.find((c) => c.id === employee?.countryId) || "N/A";
  console.log(getCountryName.id)

  const initialValues = {
    name: employee?.name || "",
    email: employee?.email || "",
    mobile: employee?.mobile || "",
    country: getCountryName?.id || employee?.countryId || "",
    state: employee?.state || "",
    district: employee?.district || "",
  };

  const schema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is Required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is Required"),

    mobile: Yup.string()
      .min(10, "Mobile number must be 10 digits")
      .max(10, "Mobile number must be 10 digits")
      .required("Mobile number is Required"),

    country: Yup.string()
      .required("Country Required"),

    state: Yup.string()
      .min(2, "State must be at least 2 characters"),

    district: Yup.string()
      .min(2, "District must be at least 2 characters"),
  });

  const handleCloseSnackbar = () => {setToastMessage((prev) => ({ ...prev, open: false }));};

  const handleSubmit = async (values, resetForm) => {
    console.log(values)
    try {
      const payload = {
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        countryId: values.country, // map to backend field
        state: values.state,
        district: values.district,
      };
      console.log(payload)

      if (id) {
        await updateEmployee({ id, ...payload }).unwrap();
        toast.success("Employee updated successfully!");
        // setToastMessage({
        //   open: true,
        //   message: "Employee updated successfully!",
        //   severity: "success",
        // });
        // console.log("Employee Updated Successfully");
      } else {
        await createEmployee(payload).unwrap();
        toast.success("Employee created successfully!");
        // setToastMessage({
        //   open: true,
        //   message: "Employee created successfully!",
        //   severity: "success",
        // });
        resetForm();
      }

      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
      // setToastMessage({
      //   open: true,
      //   message: error?.data?.message || "Something went wrong!",
      //   severity: "error",
      // });
      console.error("Submission Error:", error);
    }
  };

  // if (contryLoading || isLoading) return <p>Loading...</p>;
  
  return (
    <>
      <Box>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 3 }}
        >
          <Link
            underline="hover"
            color="text.secondary"
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer", fontSize: "0.875rem" }}
          >
            Employees
          </Link>
          <Typography variant="body2" color="text.primary">
            {isEdit ? "Edit Employee" : "New Employee"}
          </Typography>
        </Breadcrumbs>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'DM Serif Display', serif",
            fontWeight: 400,
            mb: 1,
          }}
        >
          {isEdit ? "Edit Employee" : "Add New Employee"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          {isEdit
            ? "Update the employee information below."
            : "Fill in the details to add a new employee to the directory."}
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error?.data?.message || "An error occurred while loading employee data."}
          </Typography>
        )}

        {/* Form Card */}
        <Paper
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            p: { xs: 2.5, sm: 4 },
          }}
        >
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5 }}>
            Personal Information
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            All fields marked with * are required.
          </Typography>
          <Divider sx={{ mb: 3 }} />
          {contryLoading || isLoading && <LoadingSpinner message="Loading employee details..." />}
          {/* Form fields */}
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
          >
            {({ values, handleChange, errors, touched }) => (
              <Form>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                  {/* <Grid container spacing={3}></Grid> */}
                  <Box
                    sx={{
                      flex: { xs: "1 1 100%", md: "1 1 calc(50% - 12px)" },
                    }}
                  >
                    <TextField
                      label="Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      error={touched.name && !!errors.name}
                      helperText={errors.name}
                      fullWidth
                      // margin="normal"
                    />
                  </Box>

                  <Box sx={{flex: { xs: "1 1 100%", md: "1 1 calc(50% - 12px)" },}}>
                    <TextField
                      label="Email"
                      name="email"
                      value={values.email}
                      error={touched.email && !!errors.email}
                      helperText={errors.email}
                      onChange={handleChange}
                      fullWidth
                      // margin="normal"
                    />
                  </Box>

                  <Box sx={{flex: { xs: "1 1 100%", md: "1 1 calc(50% - 12px)" },}}>
                    <TextField
                      label="Mobile"
                      name="mobile"
                      value={values.mobile}
                      error={touched.mobile && !!errors.mobile}
                      helperText={errors.mobile}
                      onChange={handleChange}
                      fullWidth
                      // margin="normal"
                    />
                  </Box>

                  <Box sx={{flex: { xs: "1 1 100%", md: "1 1 calc(50% - 12px)" },}}>
                    <TextField
                      select
                      label="Country"
                      name="country"
                      value={values.country}
                      error={touched.country && !!errors.country}
                      helperText={errors.country}
                      onChange={handleChange}
                      fullWidth
                      // margin="normal"
                    >
                      {countries?.map((c) => (
                        <MenuItem
                          key={c.id}
                          value={c.id}
                          sx={{ width: "100%" }}
                        >
                          {c.country}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>

                  <Box sx={{flex: { xs: "1 1 100%", md: "1 1 calc(50% - 12px)" }, }}>
                    <TextField
                      label="State"
                      name="state"
                      value={values.state}
                      onChange={handleChange}
                      fullWidth
                      // margin="normal"
                    />
                  </Box>

                  <Box sx={{flex: { xs: "1 1 100%", md: "1 1 calc(50% - 12px)" },}}>
                    <TextField
                      label="District"
                      name="district"
                      value={values.district}
                      onChange={handleChange}
                      fullWidth
                      // margin="normal"
                    />
                  </Box>
                </Box>
                <Button
                  type="submit"
                  sx={{ mt: 5, mx: "auto", display: "block" }}
                  variant="contained"
                  disabled={isCreating || isUpdating}
                >
                  {isUpdating || isCreating
                    ? "Saving..."
                    : isEdit
                      ? "Update Employee"
                      : "Add Employee"}
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
      <ToastMessage
        open={toastMessage.open}
        message={toastMessage.message}
        severity={toastMessage.severity}
        onClose={handleCloseSnackbar}
      />
    </>
  );
};

export default EmployeeFormPage;
