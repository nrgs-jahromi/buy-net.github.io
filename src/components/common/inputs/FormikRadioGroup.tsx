import {
  Box,
  BoxProps,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import { ErrorMessage, useField } from "formik";
import { FC } from "react";

type Props = {
  name: string;
  label?: string;
  labelVar?: Variant;
  options: { value: string|number; label: string }[];
  disabled?: boolean;
  containerProps?: BoxProps;
} & RadioGroupProps;

const FormikRadioGroup: FC<Props> = ({
  name,
  label,
  labelVar,
  options,
  disabled,
  containerProps,
  ...radioProps
}) => {
  const [fields] = useField(name);

  return (
    <Box {...containerProps} marginBottom={2} sx={{width:"100%"}}>
      <FormControl sx={{width:"100%"}}>
        {label && (
          <Typography variant={labelVar ? labelVar : "body1"} marginBottom={1}>
            {label}
          </Typography>
        )}
        <RadioGroup
        
        sx={{width:"100%" , flexDirection:radioProps.row? "row" : "column" , justifyContent:"space-between"}}

          aria-labelledby={name + "-formik-radiogroup"}
          {...radioProps}
          {...fields}
        >
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </FormControl>

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

export default FormikRadioGroup;
