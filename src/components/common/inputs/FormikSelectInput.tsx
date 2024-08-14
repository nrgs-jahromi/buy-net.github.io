import {
  FormControl,
  FormControlProps,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
  Typography,
} from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import { ErrorMessage, useField } from "formik";
import { FC } from "react";

const NULL_STR: Readonly<string> = "__NULL__";

export type SelectOption = {
  label: string;
  value: string | number | readonly string[] | null;
};

type Props = {
  name: string;
  label?: string;
  labelVar?: Variant;
  options: SelectOption[];
  formControlProps?: FormControlProps;
} & Omit<SelectProps, "value">;
const FormikSelectInput: FC<Props> = ({
  name,
  label,
  labelVar,
  options,
  formControlProps,
  ...selectProps
}) => {
  const [fields, _meta, helper] = useField(name);

  const handleChange = (e: SelectChangeEvent<unknown>) => {
    if (e.target.value === NULL_STR) {
      helper.setValue(null);
    } else {
      helper.setValue(e.target.value);
    }
  };

  return (
    <FormControl {...formControlProps} fullWidth>
      <Typography
        id={`formik-select-${name}-label`}
        variant={labelVar ? labelVar : "body1"}
        marginBottom={1}
      >
        {label}
      </Typography>
      <Select
        id={`formik-select-${name}`}
        labelId={`formik-select-${name}-label`}
        
        {...fields}
        {...selectProps}
        onChange={handleChange}
        value={fields.value === undefined ? "" : fields.value === null ? NULL_STR : fields.value}
      >
        <MenuItem value={NULL_STR}>_</MenuItem>
        {options.map((option, index) => (
          <MenuItem
            key={`${index}__${option.value}__${option.label}`}
            value={option.value === null ? NULL_STR : option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <ErrorMessage
        name={name}
        render={(msg) => (
          <Typography color="error.main" variant="body2">
            {msg}
          </Typography>
        )}
      />
    </FormControl>
  );
};

export default FormikSelectInput;
