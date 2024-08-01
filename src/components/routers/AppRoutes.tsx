import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FC } from "react";
import Login from "../auth/LoginPage";
import Verification from "../auth/Verification";

const AppRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<Verification />} />
       
       
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
