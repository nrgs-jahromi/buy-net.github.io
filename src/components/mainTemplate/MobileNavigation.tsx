import { ReactNode, useEffect, useMemo, useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import {
  Check,
  Flash,
  Profile,
  SearchNormal1,
  ShoppingCart,
} from "iconsax-react";
import { useNavigate } from "react-router";
import theme from "../../theme";

export type NavbarItem = {
  id: string;
  label: string;
  path: string;
  icon1: ReactNode;
  icon2: ReactNode;
};

export default function FixedBottomNavigation() {
  const [value, setValue] = useState<number|null>(null);
  const [active, setActive] = useState<string | null>(null);
  const navigate = useNavigate();

  const navbarItems: NavbarItem[] = useMemo(
    () => [
      {
        id: "cart",
        label: "سبد خرید",
        path: "cart",
        icon1: <ShoppingCart size={24} />,
        icon2: <ShoppingCart variant="Bold" size={30} />,
      },
      {
        id: "explore",
        label: "فروشگاه",
        path: "#",
        icon1: <Flash size={24} />,
        icon2: <Flash variant="Bold" size={30} />,
      },

      {
        id: "scan",
        label: "",
        icon1: <Check size={24} />,
        icon2: <Check variant="Bold" size={30} />,
        path: "scanner",
      },
      {
        id: "Search",
        label: "جستجو",
        icon1: <SearchNormal1 size={24} />,
        icon2: <SearchNormal1 variant="Bold" size={30} />,
        path: "search",
      },
      {
        id: "profile",
        label: "حساب کاربری",
        icon1: <Profile size={24} />,
        icon2: <Profile variant="Bold" size={30} />,
        path: "profile",
      },
    ],
    []
  );
  const onNavItemClick = (item: NavbarItem) => {
    setActive(item.id);
    navigate(item.path);
  };


  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const lastPathPart = pathParts[pathParts.length - 1];

    const matchingNavbarItem = navbarItems.find((item) => lastPathPart === item.id);
    if (matchingNavbarItem) {
      setActive(matchingNavbarItem.id);
      setValue(navbarItems.indexOf(matchingNavbarItem)); 
    }
  }, [navbarItems]);


  return (
    <>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          border: 0,
        }}
        elevation={3}
      >
        <BottomNavigation
          sx={{
            height: "72px",
            boxShadow: " 0 -4px 4px rgba(0, 0, 0, 0.1)",
            bgcolor: theme.palette.background.default,
            borderTop: "0",
          }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            onNavItemClick(navbarItems[newValue]);
          }}
        >
          {navbarItems.map((item, index) => (
            <BottomNavigationAction
              key={item.id}
              icon={value === index ? item.icon2 : item.icon1}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </>
  );
}
