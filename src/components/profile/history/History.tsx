import { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import HistoryCard from "./HistoryCard";
import koroshLogo from "../../../assets/temp logo/logo.png";
import hyperme from "../../../assets/temp logo/images.jpg";
import mackdonald from "../../../assets/temp logo/mackdonald.jpg";
import InvoiceDrawer from "./InvoiceDrawer"; // فرض کنید این کامپوننت برای نمایش فاکتور است.
import img1 from "../../../assets/Add to Cart-amico.svg"

interface InvoiceItem {
  image_url: string;
  name: string;
  quantity: number;
  unit_price: number;
  discount: number;
  total_price: number;
}

interface Purchase {
  storeImage: string;
  storeName: string;
  dateTime: string;
  amount: string;
  invoiceId: string;
  items: InvoiceItem[];
}

const reports = [
  {
    img: img1,
    value: 40,
    description: "ساعت خرید با بای‌نت",
  },
  {
    img: img1,
    value: 10,
    description: " خرید با بای‌نت",
  },
  {
    img: img1,
    value: 40,
    description: "تومان تخفیف با بای‌نت",
  },
];

const purchases: Purchase[] = [
  {
    storeImage: hyperme,
    storeName: "فروشگاه ۱",
    dateTime: "1403/05/15 14:30",
    amount: "500,000 تومان",
    invoiceId: "INV001",
    items: [
      {
        image_url: img1,
        name: "محصولljnklmkl ۱",
        quantity: 2,
        unit_price: 250000,
        discount: 0,
        total_price: 500000,
      },
      {
        image_url: img1,
        name: "محصول ۲",
        quantity: 1,
        unit_price: 150000,
        discount: 0,
        total_price: 150000,
      },
      {
        image_url: img1,
        name: "محصولljnklmkl ۱",
        quantity: 2,
        unit_price: 250000,
        discount: 0,
        total_price: 500000,
      },
      {
        image_url: img1,
        name: "محصول ۲",
        quantity: 1,
        unit_price: 150000,
        discount: 0,
        total_price: 150000,
      },
      {
        image_url: img1,
        name: "محصولljnklmkl ۱",
        quantity: 2,
        unit_price: 250000,
        discount: 0,
        total_price: 500000,
      },
      {
        image_url: img1,
        name: "محصول ۲",
        quantity: 1,
        unit_price: 150000,
        discount: 0,
        total_price: 150000,
      },
      {
        image_url: img1,
        name: "محصولljnklmkl ۱",
        quantity: 2,
        unit_price: 250000,
        discount: 0,
        total_price: 500000,
      },
      {
        image_url: img1,
        name: "محصول ۲",
        quantity: 1,
        unit_price: 150000,
        discount: 0,
        total_price: 150000,
      },
      {
        image_url: img1,
        name: "محصولljnklmkl ۱",
        quantity: 2,
        unit_price: 250000,
        discount: 0,
        total_price: 500000,
      },
      {
        image_url: img1,
        name: "محصول ۲",
        quantity: 1,
        unit_price: 150000,
        discount: 0,
        total_price: 150000,
      },
      {
        image_url: img1,
        name: "محصولljnklmkl ۱",
        quantity: 2,
        unit_price: 250000,
        discount: 0,
        total_price: 500000,
      },
      {
        image_url: img1,
        name: "محصول ۲",
        quantity: 1,
        unit_price: 150000,
        discount: 0,
        total_price: 150000,
      },
      {
        image_url: img1,
        name: "محصولljnklmkl ۱",
        quantity: 2,
        unit_price: 250000,
        discount: 0,
        total_price: 500000,
      },
      {
        image_url: img1,
        name: "محصول ۲",
        quantity: 1,
        unit_price: 150000,
        discount: 0,
        total_price: 150000,
      },

      {
        image_url: img1,
        name: "محصولljnklmkl ۱",
        quantity: 2,
        unit_price: 250000,
        discount: 0,
        total_price: 500000,
      },
      {
        image_url: img1,
        name: "محصول ۲",
        quantity: 1,
        unit_price: 150000,
        discount: 0,
        total_price: 150000,
      },
      {
        image_url: img1,
        name: "محصولljnklmkl ۱",
        quantity: 2,
        unit_price: 250000,
        discount: 0,
        total_price: 500000,
      },
      {
        image_url: img1,
        name: "محصول ۲",
        quantity: 1,
        unit_price: 150000,
        discount: 0,
        total_price: 150000,
      },
      {
        image_url: img1,
        name: "محصولljnklmkl ۱",
        quantity: 2,
        unit_price: 250000,
        discount: 0,
        total_price: 500000,
      },
      {
        image_url: img1,
        name: "محصول ۲",
        quantity: 1,
        unit_price: 150000,
        discount: 0,
        total_price: 150000,
      },
      {
        image_url: img1,
        name: "محصولljnklmkl ۱",
        quantity: 2,
        unit_price: 250000,
        discount: 0,
        total_price: 500000,
      },
      {
        image_url: img1,
        name: "محصول ۲",
        quantity: 1,
        unit_price: 150000,
        discount: 0,
        total_price: 150000,
      },
      {
        image_url: img1,
        name: "محصولljnklmkl ۱",
        quantity: 2,
        unit_price: 250000,
        discount: 0,
        total_price: 500000,
      },
      {
        image_url: img1,
        name: "محصول ۲",
        quantity: 1,
        unit_price: 150000,
        discount: 0,
        total_price: 150000,
      },
      
      // آیتم‌های بیشتر
    ],
  },
  {
    storeImage: koroshLogo,
    storeName: "فروشگاه ۲",
    dateTime: "1403/05/16 10:00",
    amount: "150,000 تومان",
    invoiceId: "INV002",
    items: [
      {
        image_url: img1,
        name: "محصول ۲",
        quantity: 1,
        unit_price: 150000,
        discount: 0,
        total_price: 150000,
      },
      // آیتم‌های بیشتر
    ],
  },
  {
    storeImage: mackdonald,
    storeName: "فروشگاه ۳",
    dateTime: "1403/05/17 16:45",
    amount: "300,000 تومان",
    invoiceId: "INV003",
    items: [
      {
        image_url: img1,
        name: "محصول ۳",
        quantity: 3,
        unit_price: 100000,
        discount: 0,
        total_price: 300000,
      },
      // آیتم‌های بیشتر
    ],
  },
];

const History = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Purchase | null>(null);

  const handleViewInvoice = (purchase: Purchase) => {
    setSelectedInvoice(purchase);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedInvoice(null);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box className="w-full p-6 space-y-4">
      <Box
        component={Paper}
        className="w-full flex justify-between items-center p-4 gap-5"
      >
        {reports.map((report, index) => (
          <Box key={index} className="flex flex-col justify-center items-center">
            <img src={report.img} height={60} width={60} />
            <Typography variant="body1" fontWeight={"bold"}>
              {report.value}
            </Typography>
            <Typography
              variant="body2"
              align="center"
              sx={{ whiteSpace: "wrap" }}
            >
              {report.description}
            </Typography>
          </Box>
        ))}
      </Box>
      {purchases.map((purchase, index) => (
        <HistoryCard
          key={index}
          storeImage={purchase.storeImage}
          storeName={purchase.storeName}
          dateTime={purchase.dateTime}
          amount={purchase.amount}
          onViewInvoice={() => handleViewInvoice(purchase)}
        />
      ))}
      {selectedInvoice && drawerOpen &&(
        <InvoiceDrawer
          open={drawerOpen}
          toggleDrawer={toggleDrawer} 
          invoiceId={selectedInvoice.invoiceId}
          totalItems={selectedInvoice.items.length}
          totalAmount={parseInt(selectedInvoice.amount.replace(/,/g, ''))}
          discount={0}
          items={selectedInvoice.items}
        />
      )}
    </Box>
  );
};

export default History;