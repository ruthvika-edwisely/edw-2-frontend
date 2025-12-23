import { Accordion, AccordionDetails, AccordionSummary, Typography, useTheme } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CustomAccordion = ({index, title, content, accordionSx, accordionSummarySx}) => {

    const theme = useTheme();
    const palette = theme.palette.problemPage;

  return (
    <Accordion
        key={index}
        sx={{...accordionSx}}
    >

        <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: palette.textSecondary }} />}
            sx={{...accordionSummarySx}}
        >

            <Typography
                sx={{
                    fontWeight: 600,
                    color: palette.textPrimary,
                    fontSize: "0.875rem",
                }}
            >
                {title}
            </Typography>

        </AccordionSummary>

        <AccordionDetails
            sx={{
                borderTop: `1px solid ${palette.cardBorder}`,
                pt: 2,
            }}
        >
            <Typography
                sx={{
                    color: palette.textSecondary,
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                    whiteSpace: "pre-wrap",
                }}
            >
                {content}
            </Typography>
        </AccordionDetails>

    </Accordion>
  )
}

export default CustomAccordion