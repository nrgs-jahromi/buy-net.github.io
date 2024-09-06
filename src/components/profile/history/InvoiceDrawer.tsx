import { FC } from "react";
import {
  Box,
  Typography,
  SwipeableDrawer,
  styled,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  lighten,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useInvoiceDetail } from "../../../api/invoice/getInvoiceDetail";
import theme from "../../../theme";

interface InvoiceDrawerProps {
  open: boolean;
  toggleDrawer: (open: boolean) => () => void;
  invoiceId: string;
}

const drawerBleeding = 56;

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const InvoiceDrawer: FC<InvoiceDrawerProps> = ({
  open,
  toggleDrawer,
  invoiceId,
}) => {
  const {
    data: invoiceDetail,
    isLoading,
    isError,
  } = useInvoiceDetail(invoiceId);

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography>خطایی رخ داده است.</Typography>;

  const totalAmount = invoiceDetail?.total_price_without_discount ?? 0;
  const discount =
    invoiceDetail?.total_price_without_discount -
      invoiceDetail?.total_price_with_discount ?? 0;
  const totalItems = invoiceDetail?.items.length ?? 0;
  const items = invoiceDetail?.items ?? [];

  const payableAmount = totalAmount - discount;

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      swipeAreaWidth={drawerBleeding}
      ModalProps={{
        keepMounted: true,
      }}
      transitionDuration={{
        enter: 500,
        exit: 500,
      }}
    >
      <Box className="p-6">
        <Box mb={2} className="w-full">
          <Typography variant="body1" fontWeight="bold" align="center">
            خرید از {invoiceDetail?.store}
          </Typography>
        </Box>

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
                      backgroundColor: lighten(
                        theme.palette.primary.light,
                        0.85
                      ),
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
    </SwipeableDrawer>
  );
};

export default InvoiceDrawer;
