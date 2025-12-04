import React from 'react'
import {
  Chip,
  Paper,
  Stack,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  Divider
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { BadgeIndianRupee } from 'lucide-react'

const Description = ({ problemData, tagsData, hintsData, constraintsData }) => {
  const { title, difficulty, xpReward, description } = problemData

  const difficultyColor =
    difficulty === 'Easy'
      ? 'success'
      : difficulty === 'Medium'
      ? 'warning'
      : 'error'

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
        {title}
      </Typography>

      
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Chip label={difficulty} color={difficultyColor} size="small" />

        <Stack direction="row" spacing={0.5} alignItems="center">
          <BadgeIndianRupee fill="#ffd700" strokeWidth="1" size={18} />
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {xpReward}
          </Typography>
        </Stack>
      </Stack>

      
      <Box sx={{display: "flex", gap: 2}}>
        <Box sx={{ mb: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="body9" sx={{ mb: 1 }}>
            Topics
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {tagsData
              .filter(tag => tag.category === 'topic')
              .map(tag => (
                <Chip key={tag.id} label={tag.name} color="primary" size="small" variant="outlined" />
              ))}
          </Stack>
        </Box>

        
        <Box sx={{ mb: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="body9" sx={{ mb: 1 }}>
            Companies
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {tagsData
              .filter(tag => tag.category === 'company')
              .map(tag => (
                <Chip key={tag.id} label={tag.name} size="small" />
              ))}
          </Stack>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body1"
          sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.7, color: 'text.secondary' }}
        >
          {description}
        </Typography>
      </Box>

      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Hints
        </Typography>

        {hintsData.map(hint => (
          <Accordion
            key={hint.id}
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              mb: 1,
              '&:before': { display: 'none' }
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 600 }}>Hint {hint.orderIndex}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {hint.content}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Constraints
        </Typography>

        <List dense>
          {constraintsData.map(item => (
            <ListItem key={item.id} sx={{ pl: 1 }}>
              <Typography variant="body2">• {item.description}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  )
}

export default Description
