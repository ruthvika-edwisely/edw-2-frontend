import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";

function SearchInput({
  value,
  onChange,
  placeholder = "Search",
  icon = <SearchIcon fontSize="small" />,
  size = "small",
  sx = {},
  InputProps = {},
}) {
  return (
    <TextField
      size={size}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      sx={{
        width: 260,
        backgroundColor: "background.paper",
        borderRadius: 2,
        ...sx,
      }}
      InputProps={{
        startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
        ...InputProps,
      }}
    />
  );
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.node,
  size: PropTypes.oneOf(["small", "medium"]),
  sx: PropTypes.object,
  InputProps: PropTypes.object,
};

export default SearchInput;
