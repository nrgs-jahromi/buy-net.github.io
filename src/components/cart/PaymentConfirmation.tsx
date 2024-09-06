import { FC, useRef } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Divider,
} from "@mui/material";
import { QRCodeCanvas } from "qrcode.react"; 
import { lighten } from "@mui/material/styles";
import { useInvoiceDetail } from "../../api/invoice/getInvoiceDetail";
import theme from "../../theme";
import { useParams } from "react-router-dom";
import { TickCircle } from "iconsax-react";

const PaymentConfirmation = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const qrRef = useRef<HTMLCanvasElement | null>(null);

  const {
    data: invoiceDetail,
    isLoading,
    isError,
  } = useInvoiceDetail(invoiceId!);

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography>خطایی رخ داده است.</Typography>;

  const totalAmount = invoiceDetail?.total_price_without_discount ?? 0;
  const discount =
    invoiceDetail?.total_price_without_discount -
      invoiceDetail?.total_price_with_discount ?? 0;
  const totalItems = invoiceDetail?.items.length ?? 0;
  const items = invoiceDetail?.items ?? [];

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        padding: 4,
        // bgcolor: "background.paper",
        borderRadius: 2,
        // boxShadow: 3,
      }}
    >
      <Box
        className="w-full items-center flex justify-center"
        sx={{ color: theme.palette.success.light }}
      >
        <TickCircle variant="Bold" size={90} />
      </Box>

      <Box mb={2} className="w-full">
        <Typography variant="body1" fontWeight="bold" align="center">
          خرید شما از {invoiceDetail?.store} با موفقیت انجام شد.
        </Typography>
      </Box>
      <Box className=" my-4 flex flex-col justify-end items-center">
        <QRCodeCanvas
          ref={qrRef}
          value={invoiceId!}
          title={"Title for my QR Code"}
          size={180}
          bgColor={theme.palette.background.default}
          fgColor={theme.palette.text.primary}
          level={"Q"}
          marginSize={0}
          // imageSettings={{
          //   src: logo,
          //   x: undefined,
          //   y: undefined,
          //   height: 45,
          //   width: 45,
          //   opacity: 1,
          //   excavate: true,
          // }}
        /></Box>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: lighten(theme.palette.primary.main, 0.2),
                  color: "white",
                }}
                align="right"
              >
                نام
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: lighten(theme.palette.primary.main, 0.2),
                  color: "white",
                }}
                align="center"
              >
                تعداد
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: lighten(theme.palette.primary.main, 0.2),
                  color: "white",
                }}
                align="center"
              >
                قیمت
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: lighten(theme.palette.primary.main, 0.2),
                  color: "white",
                }}
                align="center"
              >
                قیمت با تخفیف
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:nth-of-type(even)": {
                    backgroundColor: lighten(theme.palette.primary.light, 0.85),
                  },
                }}
              >
                <TableCell align="right">{item.product.name}</TableCell>
                <TableCell align="center">x{item.quantity}</TableCell>
                <TableCell align="center">
                  {item?.product.price?.toLocaleString()}
                </TableCell>
                <TableCell align="center">
                  {(
                    item?.total_price_with_discount / item?.quantity
                  ).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box className="w-full flex justify-between items-center mt-6">
        <Typography variant="body2">تعداد کالا</Typography>
        <Typography variant="body1" fontWeight={"bold"}>
          {totalItems}
        </Typography>
      </Box>
      <Box className="w-full flex justify-between items-center">
        <Typography variant="body2">تخفیف</Typography>
        <Typography variant="body1" fontWeight={"bold"}>
          {discount.toLocaleString()}
        </Typography>
      </Box>
      <Box className="w-full flex justify-between items-center">
        <Typography variant="body2">مالیات</Typography>
        <Typography variant="body1" fontWeight={"bold"}>
          {invoiceDetail.tax.toLocaleString()}
        </Typography>
      </Box>
      <Box className="w-full flex justify-between items-center">
        <Typography variant="body2">جمع کل (بدون تخفیف)</Typography>
        <Typography variant="body1" fontWeight={"bold"}>
          {totalAmount.toLocaleString()}
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box className="w-full flex justify-between items-center">
        <Typography variant="body1">مجموع قابل پرداخت</Typography>
        <Typography
          variant="body1"
          fontWeight={"bold"}
          color={theme.palette.primary.main}
        >
          {invoiceDetail.payable_amount.toLocaleString()} تومان
        </Typography>
      </Box>
    </Box>
  );
};

export default PaymentConfirmation;
