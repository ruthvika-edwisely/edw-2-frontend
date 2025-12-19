import { Button, Skeleton } from "@mui/material";

function PrimaryActionButton({
  label,
  startIcon,
  onClick,
  disabled = false,
  sx,
  loading = false,
  skeletonWidth = 160,
  ...props
}) {
  if (loading) {
    return (
      <Skeleton
        variant="rounded"
        height={40}
        width={skeletonWidth}
        sx={{ borderRadius: 8 }}
      />
    );
  }

  return (
    <Button
      variant="contained"
      startIcon={startIcon}
      onClick={onClick}
      disabled={disabled}
      sx={sx}
      {...props}
    >
      {label}
    </Button>
  );
}

export default PrimaryActionButton;
