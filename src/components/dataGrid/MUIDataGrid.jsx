import React from "react";
import { Card } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function MUIDataGrid({
  rows = [],
  columns = [],
  loading = false,
  rowHeight = 50,
  cardSx = {},
  gridSx = {},
  hideFooter = true,
  disableColumnMenu = true,
  toolbar = true,
}) {
  return (
    <Card sx={{ borderRadius: 3, backgroundColor: "background.paper", ...cardSx }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        hideFooter={hideFooter}
        disableColumnMenu={disableColumnMenu}
        components={toolbar ? { Toolbar: GridToolbar } : {}}
        rowHeight={rowHeight}
        sx={{
          border: "none",
          "& .MuiDataGrid-cell": { borderBottom: "1px solid", borderColor: "divider" },
          "& .MuiDataGrid-columnHeaders": { borderBottom: "2px solid", borderColor: "divider" },
          ...gridSx,
        }}
      />
    </Card>
  );
}
