import { Box, Stack, useTheme } from '@mui/material'
import React, { useRef } from 'react'
import CompHeading from '../CompHeading.jsx'
import { Building2, Code2 } from 'lucide-react'
import TagChip from '../../../../components/chips/TagChip.jsx'

const TagsSection = ({data, category, tagsRef, scrollToTags, sx}) => {

    const theme = useTheme();
    const palette = theme.palette.problemPage;
  
    return (
    <Box ref={tagsRef} sx={{ scrollMarginTop: "80px" }}>
        <CompHeading 
            icon={category==="Topic" ? Code2 : Building2}
            title={category}
            sx={{ 
                mb: 1.5,
                fontWeight: 700, 
                color: palette.labelText,
                fontSize: "0.938rem",
                letterSpacing: "-0.01em", 
          }} 
        />

        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
            {data
                .filter((t) => t.category === category)
                .map((tag, idx) => (
                    <TagChip
                        key={idx}
                        label={tag.name}
                        size="small"
                        sx={sx}
                        onClick={scrollToTags}
                    />
            ))}
        </Stack>
    </Box>
  )
}

export default TagsSection