import { enqueueSnackbar, closeSnackbar, SnackbarKey } from "notistack";
import { Button } from "@mui/material";
import theme from "../../../theme";

type NotifOptionsT = {
  variant?: "error" | "success" | "info" | "default" | "warning";
};

const handleDismiss = (key: SnackbarKey) => () => {
  closeSnackbar(key);
};

const snackbarAction = (key: SnackbarKey) => (
  <Button size="small" sx={{ color: theme.palette.grey[100] }} onClick={handleDismiss(key)}>
    رد کردن
  </Button>
);

// TODO: Handle an array of messages
export const notif = (message: string, options?: NotifOptionsT): void => {
  enqueueSnackbar(message, {
    variant: options?.variant || "default",
    action: snackbarAction,
    autoHideDuration: 5000,
    anchorOrigin: { vertical: "top", horizontal: "left" },
    className: "flex-row-reverse",
    hideIconVariant: true,
     
  });
};
