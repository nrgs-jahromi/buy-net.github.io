import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FC } from "react";
import Login from "../auth/LoginPage";
import Verification from "../auth/Verification";
import MainTemplate from "../mainTemplate/MainTemplate";

const AppRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<Verification />} />
      <Route path="/*" element={<MainTemplate />}>
          {/* <Route path="dashboard" element={<Dashboard />} /> */}

          
 
        </Route>
       
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
