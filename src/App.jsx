import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeListPage from "./pages/EmployeeListPage";
import EmployeeFormPage from "./pages/EmployeeFormPage";
import { Box, Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppLayout from "./components/AppLayout";

const App = () => {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <Box sx={{ minHeight: "100vh", bgcolor: "#F7F4EF" }}>
        <AppLayout>
          <Routes>
            <Route path="/" element={<EmployeeListPage />} />
            <Route path="/employees/new" element={<EmployeeFormPage />} />
            <Route path="/edit/:id" element={<EmployeeFormPage />} />
          </Routes>
        </AppLayout>
      </Box>
    </>
  );
};

export default App;
