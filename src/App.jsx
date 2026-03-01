import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useGetEmployeeQuery } from "./services/employeeApi";

const App = () => {
  const { data, isLoading, error } = useGetEmployeeQuery();
  console.log(data);
  if (isLoading) return <h1>Loadding</h1>;
  if (error) return <h1>error</h1>;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Appppp</h1>} />
        {/* <Route path="/add" element={<EmployeeFormPage />} />
        <Route path="/edit/:id" element={<EmployeeFormPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
