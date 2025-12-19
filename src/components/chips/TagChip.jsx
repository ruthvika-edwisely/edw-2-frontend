import { Chip, Skeleton } from "@mui/material";

function TagChip({
  label,
  icon,
  size = "small",
  sx,
  loading = false,
  skeletonWidth = 80,
  ...props
}) {
  if (loading) {
    return (
      <Skeleton
        variant="rounded"
        height={size === "small" ? 24 : 32}
        width={skeletonWidth}
        sx={{ borderRadius: 16 }}
      />
    );
  }

  return (
    <Chip
      label={label}
      icon={icon}
      size={size}
      sx={sx}
      {...props}
    />
  );
}

export default TagChip;
