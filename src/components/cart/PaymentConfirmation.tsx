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
import Barcode from "react-barcode"; // کتابخانه برای تولید بارکد
import { lighten } from "@mui/material/styles";
import { useInvoiceDetail } from "../../api/invoice/getInvoiceDetail";
import theme from "../../theme";
import { useParams } from "react-router-dom";
import { TickCircle } from "iconsax-react";

const PaymentConfirmation: FC = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();

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
    height={"100%"}
      paddingBottom={10}
      className="flex flex-col justify-between "
      
      sx={{
        padding: 4,
      }}
    >
      <Box height={"fit-content"}>
        <Box
          className="w-full items-center flex flex-col justify-center"
          sx={{ color: theme.palette.success.light }}
        >
          <TickCircle variant="Bold" size={90} />
         
        </Box> <Typography variant="body1" fontWeight="bold" align="center">
            خرید شما از {invoiceDetail?.store} با موفقیت انجام شد.
          </Typography>
        <Box className=" my-4 flex flex-col justify-end items-center">
          <Barcode
            value={invoiceId!}
            width={2}
            height={50}
            format="CODE128" 
            displayValue={false}
            background={theme.palette.background.default}
            lineColor={theme.palette.text.primary}
          />
        </Box>
        <TableContainer component={Paper} sx={{maxHeight:"45vh" , overflow:"auto"}}>
        <Table size="small">
          <TableHead sx={{position:"sticky" , top:0}}>
            <TableRow >
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

      </Box>

      
      <Box>
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
    </Box>
  );
};

export default PaymentConfirmation;
