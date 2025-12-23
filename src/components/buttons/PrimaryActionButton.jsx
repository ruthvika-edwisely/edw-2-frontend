import { Button, Skeleton } from "@mui/material";

function PrimaryActionButton({
  label,
  startIcon,
  variant="contained",
  onClick,
  disabled = false,
  sx,
  loading = false,
  fullWidth = false,
  skeletonWidth = 160,
  ...props
}) {
  if (loading) {
    return (
      <Skeleton
        variant="rounded"
        height={40}
        width={fullWidth ? "100%" : skeletonWidth}
        sx={{ borderRadius: 8, ...sx }}
      />
    );
  }

  return (
    <Button
      variant={variant}
      startIcon={startIcon}
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
      sx={sx}
      {...props}
    >
      {label}
    </Button>
  );
}

export default PrimaryActionButton;
