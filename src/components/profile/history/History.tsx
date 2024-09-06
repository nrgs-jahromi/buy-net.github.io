import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { PurchasedT, useInvoices } from "../../../api/invoice/getInvoiceList";
import { useState } from "react";
import HistoryCard from "./HistoryCard";
import InvoiceDrawer from "./InvoiceDrawer";
import { usePurchaseSummary } from "../../../api/invoice/getInvoice";

const History = () => {
  const { data: purchases, isLoading, isError } = useInvoices();
  const { data: summaryData, isLoading: isSummaryLoading } =
    usePurchaseSummary();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<PurchasedT | null>(
    null
  );

  const handleViewInvoice = (purchase: PurchasedT) => {
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

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography>خطایی رخ داده است.</Typography>;

  return (
    <Box className="w-full p-6 space-y-4">
      <Box
        component={Paper}
        className="w-full flex justify-between items-center p-4 gap-5"
      >
        {isSummaryLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Box className="flex flex-col justify-center items-center">
              <Typography variant="body1" fontWeight={"bold"}>
                {summaryData?.store_count}
              </Typography>
              <Typography variant="body2" align="center">
                تعداد فروشگاه‌ها
              </Typography>
            </Box>
            <Box className="flex flex-col justify-center items-center">
              <Typography variant="body1" fontWeight={"bold"}>
                {summaryData?.total_purchase_amount}
              </Typography>
              <Typography variant="body2" align="center">
                تعداد کل خریدها
              </Typography>
            </Box>
            <Box className="flex flex-col justify-center items-center">
              <Typography variant="body1" fontWeight={"bold"}>
                {summaryData?.total_purchase_amount.toLocaleString()} تومان
              </Typography>
              <Typography variant="body2" align="center">
                مقدار کل هزینه شده
              </Typography>
            </Box>
          </>
        )}
      </Box>
      {purchases?.map((purchase, index) => (
        <HistoryCard
          key={index}
          storeImage={purchase.store_logo}
          storeName={purchase.store_name}
          dateTime={purchase.purchase_time}
          amount={"10"}
          onViewInvoice={() => handleViewInvoice(purchase)}
        />
      ))}
      {selectedInvoice && drawerOpen && (
        <InvoiceDrawer
          open={drawerOpen}
          toggleDrawer={toggleDrawer}
          invoiceId={selectedInvoice.invoice_id}
        />
      )}
    </Box>
  );
};

export default History;
