import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FC } from "react";
import Login from "../auth/LoginPage";
import Verification from "../auth/Verification";
import MainTemplate from "../mainTemplate/MainTemplate";
import UserProfilePage from "../profile/UserProfilePage";
import History from "../profile/history/History";
import ScanPage from "../scannner/ScanPage";
import ProductDetail from "../product/ProductDetail";
import CartPage from "../cart/CartPage";
import SearchPage from "../search/SearchPage";
import ExplorePage from "../explore/ExplorePage";

const AppRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/verify/:phoneNumber" element={<Verification />} />
      <Route path="/*" element={<MainTemplate />}>
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="history" element={<History />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="scanner" element={<ScanPage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="products/:productId" element={<ProductDetail />} />

          
 
        </Route>
       
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
