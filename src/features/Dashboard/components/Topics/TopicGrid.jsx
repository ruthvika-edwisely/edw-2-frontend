import { useEffect } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { alpha, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import InfoCard from "../../../../components/cards/InfoCard";
import {
  fetchTopics,
  setSelectedTopic,
  clearSelectedTopic,
} from "../../../../store/features/topic/topicDashboardSlice";

import {
  AccountTree as AccountTreeIcon,
  Storage as StorageIcon,
  TextFields as TextFieldsIcon,
  Bolt as BoltIcon,
  Hub as HubIcon,
  AutoFixHigh as AutoFixHighIcon,
  Memory as MemoryIcon,
} from "@mui/icons-material";

const colors = ["#F97316", "#10B981", "#3B82F6", "#F43F5E", "#8B5CF6", "#EAB308"];
const icons = [
  AccountTreeIcon,
  StorageIcon,
  TextFieldsIcon,
  BoltIcon,
  HubIcon,
  AutoFixHighIcon,
  MemoryIcon,
];

export default function TopicGrid({ navigateOnClick = false }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { topics, loading, selectedTopic } = useSelector(
    (state) => state.topicDashboard
  );

  useEffect(() => {
    dispatch(fetchTopics());
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 2 }}>
          Explore Topics
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {[1, 2, 3, 4, 5].map((item) => (
            <Skeleton
              key={item}
              variant="rectangular"
              height={140}
              sx={{ borderRadius: 2, flex: "1 1 calc(20% - 16px)", minWidth: 140 }}
            />
          ))}
        </Box>
      </Box>
    );
  }

  const handleInfoCard = ()=>{

  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 2 }}>
        Explore Topics
      </Typography>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {topics.map((topic, index) => {
          const color = colors[index % colors.length];
          const IconComponent = icons[index % icons.length];
          const isSelected = selectedTopic === topic.name;

          return (
            <InfoCard
              key={topic.id}
              isIconHead={true}
              headingIcon={IconComponent}
              contentText={topic.name}
              subContentText={`${topic.problem_count} Problems`}
              color={color}
              sxCard={{
                flex: "1 1 calc(20% - 16px)",
                minWidth: 140,
                height: 150,
                border: "1px solid",
                borderColor: isSelected ? color : alpha(theme.palette.text.primary, 0.1),
                backgroundColor: isSelected ? alpha(color, 0.2) : theme.palette.background.paper,
                "&:hover": {
                  borderColor: color,
                  boxShadow: `0 4px 20px ${alpha(color, 0.3)}`,
                  transform: "translateY(-2px)",
                },
                transition: "all 0.2s",
              }}
              onClick={() => {
                if (isSelected) dispatch(clearSelectedTopic());
                else dispatch(setSelectedTopic(topic.name));
                if (navigateOnClick) navigate("/all-problems");
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}
