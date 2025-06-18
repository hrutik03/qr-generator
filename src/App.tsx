import { Route, Routes } from "react-router-dom";
import "./App.css";
import BusinessCard from "./BusinessCard";
import EmployeeQRForm from "./EmployeeQrForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<EmployeeQRForm />} />
        <Route path="/business-card" element={<BusinessCard />} />
      </Routes>
    </>
  );
}

export default App;
