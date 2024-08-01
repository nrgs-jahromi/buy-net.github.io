import {
  Box,
  BoxProps,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import { ErrorMessage, useField } from "formik";
import { FC, ReactNode, useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

type Props = {
  name: string;
  label?: string;
  labelVar?: Variant;
  disabled?: boolean;
  containerProps?: BoxProps;
  noPasswordVisibility?: boolean;
  Icon?: ReactNode;
} & TextFieldProps;

const FormikInput: FC<Props> = ({
  name,
  label,
  labelVar,
  disabled,
  containerProps,
  noPasswordVisibility,
  Icon,
  ...inputProps
}) => {
  const [fields] = useField(name);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  return (
    <Box {...containerProps} marginBottom={2}>
      <Typography variant={labelVar ? labelVar : "body1"} marginBottom={1}>
        {label}
      </Typography>
      <TextField
        fullWidth
        disabled={disabled}
        {...fields}
        {...inputProps}
        value={fields.value === undefined ? "" : fields.value}
        sx={{
          bgcolor: disabled ? "palette.action.disabled" : "",
          p: 0,
        }}
        type={showPassword ? "text" : inputProps.type}
        InputProps={{
          endAdornment:
            inputProps.type === "password" && !noPasswordVisibility ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
                </IconButton>
              </InputAdornment>
            ) : undefined,
          startAdornment: Icon ? (
            <InputAdornment position="start">{Icon}</InputAdornment>
          ) : undefined,
        }}
      />

      <ErrorMessage
        name={name}
        render={(msg) => (
          <Typography variant="body2" color="error.main">
            {msg}
          </Typography>
        )}
      />
    </Box>
  );
};

export default FormikInput;
