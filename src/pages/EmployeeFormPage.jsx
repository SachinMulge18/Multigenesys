import { Button, MenuItem, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useGetCountriesQuery } from "../services/countryApi";
import { useCreateEmployeeMutation, useGetEmployeeByIdQuery, useUpdateEmployeeMutation } from "../services/employeeApi";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import ToastMessage from "../components/ui/ToastMessage";

const EmployeeFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [toastMessage,setToastMessage] = useState({
    open:false,
    message:"",
    severity: "success"
  })
  const { data: employee, isLoading, error, } = useGetEmployeeByIdQuery(id, { skip: !id });
  const { data: countries, isLoading: contryLoading } = useGetCountriesQuery();
  const [createEmployee, { isLoading: isCreating }] = useCreateEmployeeMutation();
  const [updateEmployee, { isLoading: isUpdating }] = useUpdateEmployeeMutation();

  const getCountryName = countries?.find((c) => c.id === employee?.countryId)?.id || "N/A";

  console.log("getCountryName", getCountryName);

  const initialValues = {
    name: employee?.name || "",
    email: employee?.email || "",
    mobile: employee?.mobile || "",
    country: employee?.countryId || "",
    state: employee?.state || "",
    district: employee?.district || "",
  };

  const schema = Yup.object({
    name: Yup.string().required("Name is Required"),
    email: Yup.string().email().required("email is Required"),
    mobile: Yup.string().min(10).max(10).required("Mobile number is Required"),
    country: Yup.string().required("Country Required"),
  });

  const handleCloseSnackbar = () => {setToastMessage((prev) => ({ ...prev, open: false }));};
  
  const handleSubmit = async (values, resetForm) => {
  try {
    const payload = {
      name: values.name,
      email: values.email,
      mobile: values.mobile,
      countryId: values.country, // map to backend field
      state: values.state,
      district: values.district,
    };

    if (id) {
      await updateEmployee({ id, ...payload }).unwrap();
      setToastMessage({
        open: true,
        message: "Employee updated successfully!",
        severity: "success",
      });
      console.log("Employee Updated Successfully");
    } else {
      await createEmployee(payload).unwrap();
      setToastMessage({
        open: true,
        message: "Employee created successfully!",
        severity: "success",
      })
      console.log("Employee Created Successfully");
      resetForm();
    }

    navigate("/");
  } catch (error) {
    setToastMessage({
      open: true,
      message: error?.data?.message || "Something went wrong!",
      severity: "error",
    });
    console.error("Submission Error:", error);
  }
};

  if (contryLoading || isLoading) return <p>Loading...</p>;
  if (error) return <h1>console.error();</h1>;
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
        // onSubmit={async (values) => {
        //   if (id) {
        //     console.log("update");
        //     // await updateEmployee({ id, ...values });
        //   } else {
        //     console.log(values);
        //   }
        //   //   navigate("/");
        // }}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form style={{ padding: 20 }}>
            <TextField
              label="Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={touched.name && !!errors.name}
              helperText={errors.name}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Email"
              name="email"
              value={values.email}
              error={touched.email && !!errors.email}
              helperText={errors.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Mobile"
              name="mobile"
              value={values.mobile}
              error={touched.mobile && !!errors.mobile}
              helperText={errors.mobile}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              select
              label="Country"
              name="country"
              value={values.country}
              error={touched.country && !!errors.country}
              helperText={errors.country}
              onChange={handleChange}
              fullWidth
              margin="normal"
            >
              {countries?.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.country}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="State"
              name="state"
              value={values.state}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="District"
              name="district"
              value={values.district}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <Button type="submit" variant="contained" disabled={isCreating || isUpdating}>
              Save
            </Button>
          </Form>
        )}
      </Formik>
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
