import { FC } from "react";
import {
  Box,
  Typography,
  SwipeableDrawer,
  styled,
  Divider,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useFormik } from "formik";

interface InvoiceDrawerProps {
  open: boolean;
  toggleDrawer: (open: boolean) => () => void;
  totalItems: number;
  totalAmount: number;
  discount: number;
  invoiceId: string;
  items: {
    image_url: string;
    name: string;
    quantity: number;
    unit_price: number;
    discount: number;
    total_price: number;
  }[];
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
  totalItems,
  totalAmount,
  discount,
  invoiceId,
  items,
}) => {
  const formik = useFormik({
    initialValues: {
      discountCode: "",
    },
    onSubmit: (values) => {
      console.log("Applied discount code:", values.discountCode);
      // Handle discount code application logic here
    },
  });

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
            خرید از {invoiceId}
          </Typography>
        </Box>

        <TableContainer component={Paper} >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: grey[100] }} align="right">نام</TableCell>
                <TableCell sx={{ backgroundColor: grey[100] }}align="center">تعداد</TableCell>
                <TableCell sx={{ backgroundColor: grey[100] }} align="center">قیمت</TableCell>
                <TableCell sx={{ backgroundColor: grey[100] }} align="center">تخفیف</TableCell>
                {/* <TableCell sx={{ backgroundColor: grey[100] }}>مجموع</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: grey[50] } }}>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="center">x{item.quantity}</TableCell>
                  <TableCell align="center">{item.unit_price.toLocaleString()}</TableCell>
                  <TableCell align="center">{item.discount.toLocaleString()}</TableCell>
                  {/* <TableCell>{item.total_price.toLocaleString()}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* <Divider sx={{ my: 2 }} /> */}
        <Box className="w-full flex justify-between items-center mt-6">
          <Typography variant="body2">مجموع اقلام</Typography>
          <Typography variant="body1" fontWeight={"bold"}>
            {totalItems} کالا
          </Typography>
        </Box>
        <Box className="w-full flex justify-between items-center">
          <Typography variant="body2">تخفیف</Typography>
          <Typography variant="body1" fontWeight={"bold"}>
            {discount.toLocaleString()} تومان
          </Typography>
        </Box>
        <Box className="w-full flex justify-between items-center">
          <Typography variant="body2">مجموع</Typography>
          <Typography variant="body1" fontWeight={"bold"}>
            {totalAmount.toLocaleString()} تومان
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box className="w-full flex justify-between items-center">
          <Typography variant="body2">مجموع قابل پرداخت</Typography>
          <Typography variant="body1" fontWeight={"bold"}>
            {payableAmount.toLocaleString()} تومان
          </Typography>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};

export default InvoiceDrawer;
