import {
  Box,
  BoxProps,
  TextField,
  TextFieldProps,
  TextareaAutosize,
  TextareaAutosizeProps,
  Typography,
} from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import { ErrorMessage, useField } from "formik";
import { FC } from "react";

type Props = {
  name: string;
  label?: string;
  labelVar?: Variant;
  disabled?: boolean;
  containerProps?: BoxProps;
  labelFontSize?: number;
} & TextFieldProps;

const FormikTextArea: FC<Props> = ({
  name,
  label,
  labelVar,
  disabled,
  labelFontSize,
  containerProps,
  ...inputProps
}) => {
  const [fields] = useField(name);

  return (
    <Box {...containerProps} marginBottom={2}>
      <Typography variant={labelVar?labelVar:"body1"} marginBottom={1}>
        {label}
      </Typography>
      <TextField
        InputLabelProps={{ style: { fontSize: labelFontSize || undefined } }}
        disabled={disabled}
        multiline
        fullWidth
        {...inputProps}
        {...fields}
        value={fields.value === undefined ? "" : fields.value}
        style={{ backgroundColor: disabled ? "palette.action.disabled" : "" }}
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

export default FormikTextArea;
