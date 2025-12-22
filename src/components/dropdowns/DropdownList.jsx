import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

export default function DropdownList({
  value,
  onChange,
  options = [],
  sx = {},
  size = "medium",
  IconComponent,
  selectProps = {},
  disableFocus = false,
}) {
  return (
    <FormControl size={size} sx={sx}>
      <Select
        value={value}
        onChange={onChange}
        IconComponent={IconComponent}
        {...selectProps}
        sx={{
          // Only remove the focus ring, keep the normal border
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: selectProps?.borderColor || undefined,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': disableFocus
            ? { borderColor: selectProps?.borderColor || undefined, boxShadow: 'none' }
            : {},
          ...selectProps.sx,
        }}
        MenuProps={selectProps?.MenuProps}
      >
        {options.map((opt) => (
          <MenuItem
            key={opt?.value}
            value={opt?.value}
            disabled={opt?.disabled || false}
            sx={opt?.sx || {}}
          >
            {opt?.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
