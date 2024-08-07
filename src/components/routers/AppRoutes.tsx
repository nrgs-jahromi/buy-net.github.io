import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FC } from "react";
import Login from "../auth/LoginPage";
import Verification from "../auth/Verification";
import MainTemplate from "../mainTemplate/MainTemplate";
import UserProfilePage from "../profile/UserProfilePage";
import History from "../profile/history/History";
import ScanPage from "../scannner/ScanPage";

const AppRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<Verification />} />
      <Route path="/*" element={<MainTemplate />}>
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="history" element={<History />} />
          <Route path="scanner" element={<ScanPage />} />

          
 
        </Route>
       
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
