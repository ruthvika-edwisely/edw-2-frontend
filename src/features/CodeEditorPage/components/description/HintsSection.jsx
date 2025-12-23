import React from 'react'
import CompHeading from '../CompHeading';
import { Lightbulb } from '@mui/icons-material';
import { Box, Stack, useTheme } from '@mui/material';
import CustomAccordion from '../../../../components/accordion/CustomAccordion';

const HintsSection = ({data}) => {

    const theme = useTheme();
    const palette = theme.palette.problemPage;

    if(!data || data.length <= 0) return;

    return (
        <Box sx={{ mb: 3 }}>
            <CompHeading 
                icon={Lightbulb} 
                title={"Hints"} 
                sx={{ 
                    mb: 2,
                    fontWeight: 700, 
                    color: palette.labelText,
                    fontSize: "0.938rem",
                    letterSpacing: "-0.01em", 
                }} 
            />
            <Stack spacing={1}>
                {data?.map((hint, idx) => (
                    <CustomAccordion
                        key={idx}
                        index={idx}
                        title={`Hint ${idx+1}`} 
                        
                        content={hint.content} 
                        
                        accordionSx={{
                            backgroundColor: palette.exampleBg,
                            border: `1px solid ${palette.cardBorder}`,
                            borderRadius: "8px !important",
                            "&:before": {
                                display: "none",
                            },
                            "&.Mui-expanded": {
                                margin: "0 !important",
                                marginBottom: "8px !important",
                            },
                            boxShadow: "none",
                        }}
                       
                        accordionSummarySx={{
                            minHeight: "48px",
                            "&.Mui-expanded": {
                            minHeight: "48px",
                            },
                            "& .MuiAccordionSummary-content": {
                            margin: "12px 0",
                            },
                        }}
                    />
                ))}
            </Stack>
        </Box>
    )
}

export default HintsSection