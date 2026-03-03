import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeListPage from "./pages/EmployeeListPage";
import EmployeeFormPage from "./pages/EmployeeFormPage";
import { Box, Container } from "@mui/material";

const App = () => {
  return (
    <BrowserRouter>
      <Box sx={{ minWidth:"100vw", minHeight: "100vh", bgcolor: "#f5f5f5", py: 4 }}>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<EmployeeListPage />} />
            <Route path="/add" element={<EmployeeFormPage />} />
            <Route path="/edit/:id" element={<EmployeeFormPage />} />
          </Routes>
        </Container>
      </Box>
    </BrowserRouter>
  );
};

export default App;
