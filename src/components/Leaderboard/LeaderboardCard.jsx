import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  LinearProgress,
  Skeleton,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  EmojiEvents as EmojiEventsIcon,
} from "@mui/icons-material";

import { getLeaderboardUsers } from "../../store/features/leaderboard/leaderboardSlice";

const defaultAvatars = [
  "https://mui.com/static/images/avatar/1.jpg",
  "https://mui.com/static/images/avatar/2.jpg",
  "https://mui.com/static/images/avatar/3.jpg",
  "https://mui.com/static/images/avatar/4.jpg",
];

export default function Leaderboard() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { users = [], loading } = useSelector(
    (state) => state.leaderboard || {}
  );
  const { user: currentUserRaw } = useSelector(
    (state) => state.auth || {}
  );

  const [scope, setScope] = useState("global");

  /* ---------------- Fetch ---------------- */

  useEffect(() => {
    dispatch(getLeaderboardUsers());
  }, [dispatch]);

  /* ---------------- Normalize ---------------- */

  const normalizedUsers = users.map((u, i) => ({
    id: u.id ?? u._id ?? i,
    name: u.name ?? u.username ?? "Unknown",
    avatar: u.avatar ?? defaultAvatars[i % defaultAvatars.length],
    college: u.college ?? null,
    totalXP: Number(u.total_xp ?? u.totalXP ?? u.xp ?? 0),
  }));

  const currentUser = currentUserRaw
    ? {
        id: currentUserRaw.id ?? currentUserRaw._id,
        name: currentUserRaw.name ?? "You",
        avatar:
          currentUserRaw.avatar ?? defaultAvatars[0],
        college: currentUserRaw.college ?? null,
        totalXP: Number(
          currentUserRaw.total_xp ??
            currentUserRaw.totalXP ??
            currentUserRaw.xp ??
            0
        ),
      }
    : null;

  /* ---------------- Filter & Sort ---------------- */

  const filteredUsers =
    scope === "college" && currentUser?.college
      ? normalizedUsers.filter(
          (u) => u.college === currentUser.college
        )
      : normalizedUsers;

  const sortedUsers = [...filteredUsers].sort(
    (a, b) => b.totalXP - a.totalXP
  );

  const topUsers = sortedUsers.slice(0, 5);

  const currentUserRank =
    currentUser &&
    sortedUsers.findIndex((u) => u.id === currentUser.id) + 1;

  const firstXP = sortedUsers[0]?.totalXP ?? 0;
  const myXP = currentUser?.totalXP ?? 0;
  const xpToFirst = Math.max(0, firstXP - myXP);
  const progressToNextRank = ((myXP % 500) / 500) * 100;

  /* ---------------- Helpers ---------------- */

  const getRowBg = (rank, isMe) => {
    if (isMe) return theme.palette.action.selected;
  
    if (rank === 1) {
      return theme.palette.mode === "dark"
        ? alpha(theme.palette.warning.main, 0.25)
        : theme.palette.warning.light;
    }
  
    if (rank === 2) {
      return theme.palette.action.hover;
    }
  
    if (rank === 3) {
      return theme.palette.action.hover;
    }
  
    return "transparent";
  };
  
  /* ---------------- Loading ---------------- */

  if (loading) {
    return (
      <Card sx={{ backgroundColor: theme.palette.background.paper }}>
        <CardContent sx={{ p: 3 }}>
          <Skeleton width={140} height={28} />
          {[1, 2, 3, 4].map((i) => (
            <Box key={i} sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Box sx={{ flex: 1 }}>
                <Skeleton width="60%" />
                <Skeleton width="40%" />
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: 3,
        height: "100%",
        width: "100%",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            Leaderboard
          </Typography>

          <FormControl size="small">
            <Select
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              IconComponent={KeyboardArrowDownIcon}
              sx={{
                minWidth: 130,
                height: 36,
                fontSize: 14,
              }}
            >
              <MenuItem value="global">Global</MenuItem>
              <MenuItem
                value="college"
                disabled={!currentUser?.college}
              >
                {currentUser?.college
                  ? "College"
                  : "College (N/A)"}
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Top Users */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
          {topUsers.map((u, i) => {
            const rank = i + 1;
            const isMe = u.id === currentUser?.id;

            return (
              <Box
                key={u.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 1,
                  py: 1,
                  borderRadius: 2,
                  backgroundColor: getRowBg(rank, isMe),
                }}
              >
                {/* Rank */}
                <Box
                  sx={{
                    width: 26,
                    textAlign: "center",
                    fontWeight: 600,
                  }}
                >
                  {rank === 1 ? (
                    <EmojiEventsIcon
                      sx={{
                        fontSize: 18,
                        color:
                          theme.palette.mode === "dark"
                            ? theme.palette.warning.light
                            : theme.palette.warning.main,
                      }}
                    />
                  ) : (
                    rank
                  )}
                </Box>

                <Avatar src={u.avatar} sx={{ width: 42, height: 42 }} />

                <Box sx={{ flex: 1 }}>
                  <Typography fontSize={14} fontWeight={600}>
                    {u.name}
                  </Typography>
                  <Typography fontSize={12} color="text.secondary">
                    {u.totalXP.toLocaleString()} XP
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Current User */}
        {currentUser && currentUserRank > 5 && (
          <>
            <Typography
              sx={{
                textAlign: "center",
                my: 1,
                letterSpacing: 2,
                color: "text.secondary",
              }}
            >
              ...
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 1,
                py: 1.2,
                borderRadius: 2,
                backgroundColor: theme.palette.action.selected,
              }}
            >
              <Typography sx={{ width: 26, textAlign: "center", fontWeight: 600 }}>
                {currentUserRank}
              </Typography>

              <Avatar src={currentUser.avatar} sx={{ width: 42, height: 42 }} />

              <Box sx={{ flex: 1 }}>
                <Typography fontSize={14} fontWeight={600} color="primary.main">
                  You ({currentUser.name})
                </Typography>
                <Typography fontSize={12} color="text.secondary">
                  {myXP.toLocaleString()} XP
                </Typography>
              </Box>
            </Box>
          </>
        )}

        {/* XP Progress */}
        {currentUser && (
          <Box sx={{ mt: 3 }}>
            <Typography fontSize={12} color="text.secondary" fontWeight={500}>
              {xpToFirst === 0
                ? "You are Rank #1 🎉"
                : `${xpToFirst.toLocaleString()} XP away from Rank #1`}
            </Typography>

            <LinearProgress
              variant="determinate"
              value={progressToNextRank}
              sx={{
                height: 8,
                mt: 2,
                borderRadius: 6,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[800]
                    : theme.palette.grey[200],
                "& .MuiLinearProgress-bar": {
                  backgroundColor: theme.palette.primary.main,
                },
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
