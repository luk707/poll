import React from "react";
import { Box, Label, TextField, Text } from "gestalt";

const renderField = ({
  input: { value, onChange, onBlur, onFocus },
  label,
  name,
  placeholder,
  type,
  meta: { touched, error }
}) => (
  <Box>
    <Box marginBottom={2}>
      <Label htmlFor={name}>
        <Text>{label}</Text>
      </Label>
    </Box>
    <TextField
      value={value}
      onChange={({ event }) => onChange(event)}
      onBlur={({ event }) => onBlur(event)}
      onFocus={({ event }) => onFocus(event)}
      name={name}
      type={type}
      placeholder={placeholder}
      errorMessage={(touched && error) || null}
    />
  </Box>
);

export default renderField;
