import { List, ListItem, Typography, useTheme } from '@mui/material'
import React from 'react'

const BulletList = ({data}) => {

  const theme = useTheme();
  const palette = theme.palette.problemPage;

  return (
    <List
      dense
      sx={{ pl: 1 }}
    >
      {data.map((item, idx) => (
        <ListItem
          key={idx}
          sx={{ 
            p: 0, 
            mb: 1,
            display: "flex",
            alignItems: "flex-start",
          }}
        >

          <Typography
            component="span"
            sx={{
              color: palette.textSecondary,
              mr: 1,
              fontSize: "0.875rem",
              lineHeight: 1.6,
            }}
          >
            •
          </Typography>


          <Typography
            variant="body2"
            sx={{
              color: palette.textSecondary,
              fontWeight: 400,
              fontSize: "0.875rem",
              lineHeight: 1.6,
              fontFamily: "'Inter', -apple-system, sans-serif",
            }}
          >
            {item.content}
          </Typography>

        </ListItem>

      ))}
    </List>
  )
}

export default BulletList