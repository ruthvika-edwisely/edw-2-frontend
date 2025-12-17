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
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  EmojiEvents as EmojiEventsIcon,
} from "@mui/icons-material";
import { getLeaderboardUsers } from "../../store/features/leaderboard/leaderboardSlice";
import { useTheme } from "@mui/material/styles";

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
  const { user: currentUserRaw } = useSelector((state) => state.auth || {});
  const [scope, setScope] = useState("global");

  useEffect(() => {
    dispatch(getLeaderboardUsers());
  }, [dispatch]);

  // Normalize users
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
        avatar: currentUserRaw.avatar ?? defaultAvatars[0],
        college: currentUserRaw.college ?? null,
        totalXP: Number(
          currentUserRaw.total_xp ??
            currentUserRaw.totalXP ??
            currentUserRaw.xp ??
            0
        ),
      }
    : null;

  // Filter by scope
  const filteredUsers =
    scope === "college" && currentUser?.college
      ? normalizedUsers.filter((u) => u.college === currentUser.college)
      : normalizedUsers;

  // Sort and assign tie-aware ranks
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    // Primary: XP descending
    if (b.totalXP !== a.totalXP) return b.totalXP - a.totalXP;
  
    // Secondary: current user first if XP ties
    if (currentUser) {
      if (a.id === currentUser.id) return -1;
      if (b.id === currentUser.id) return 1;
    }
  
    return 0;
  });
  

  let rankCounter = 0;
  let prevXP = null;
  let sameRankCount = 0;

  const rankedUsers = sortedUsers.map((u) => {
    if (u.totalXP === prevXP) {
      sameRankCount += 1;
    } else {
      rankCounter += 1 + sameRankCount;
      sameRankCount = 0;
    }
    prevXP = u.totalXP;
    return { ...u, rank: rankCounter };
  });

  const topUsers = rankedUsers.slice(0, 5);
  const currentUserRank = currentUser
    ? rankedUsers.find((u) => u.id === currentUser.id)?.rank
    : null;

  const firstXP = rankedUsers[0]?.totalXP ?? 0;
  const myXP = currentUser?.totalXP ?? 0;
  const xpToFirst = Math.max(0, firstXP - myXP);

  // Calculate progress to next rank
  let progressToNextRank = 0;
  if (currentUser && currentUserRank) {
    if (currentUserRank === 1) progressToNextRank = 100;
    else {
      const aboveUser = rankedUsers.find((u) => u.rank === currentUserRank - 1);
      const me = rankedUsers.find((u) => u.id === currentUser.id);
      if (aboveUser) {
        const range = Math.max(1, aboveUser.totalXP - me.totalXP);
        const progress = me.totalXP - (aboveUser.totalXP - range);
        progressToNextRank = Math.min(100, Math.max(0, (progress / range) * 100));
      }
    }
  }

  // Row background helper
  const getRowBg = (rank, isMe) => {
    if (isMe) return theme.palette.action.selected;
    if (rank === 1)
      return theme.palette.mode === "dark"
        ? alpha(theme.palette.warning.main, 0.25)
        : theme.palette.warning.light;
    if (rank === 2 || rank === 3) return theme.palette.action.hover;
    return "transparent";
  };

  if (loading) {
    return (
      <Card
        sx={{
          backgroundColor: theme.palette.background.paper,
          minWidth: 392,
          minHeight: 500,
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Skeleton width={140} height={28} />
          {[1, 2, 3, 4].map((i) => (
            <Box key={i} sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Skeleton variant="circular" width={42} height={42} />
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

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: 3,
        minWidth: 392,
        minHeight: 500,
        width: "100%",
        height: "100%",
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
              sx={{ minWidth: 130, height: 36, fontSize: 14 }}
            >
              <MenuItem value="global">Global</MenuItem>
              <MenuItem value="college" disabled={!currentUser?.college}>
                {currentUser?.college ? "College" : "College (N/A)"}
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Top Users */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
          {topUsers.map((u) => {
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
                  backgroundColor: getRowBg(u.rank, isMe),
                  border: isMe ? `2px solid ${theme.palette.primary.main}` : "none",
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
                  {u.rank === 1 ? (
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
                    u.rank
                  )}
                </Box>

                <Avatar
                  src={u.avatar}
                  sx={{
                    width: isMe ? 48 : 42,
                    height: isMe ? 48 : 42,
                    border: isMe ? `2px solid ${theme.palette.primary.main}` : "none",
                  }}
                />

                <Box sx={{ flex: 1 }}>
                  <Typography
                    fontSize={isMe ? 15 : 14}
                    fontWeight={isMe ? 700 : 600}
                    color={isMe ? theme.palette.primary.main : "inherit"}
                  >
                    {isMe ? `You (${u.name})` : u.name}
                  </Typography>
                  <Typography fontSize={12} color="text.secondary">
                    {u.totalXP.toLocaleString()} XP
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Current user if not in top 5 */}
        {currentUser && currentUserRank > 5 && (
          <>
            <Typography
              sx={{ textAlign: "center", my: 1, letterSpacing: 2, color: "text.secondary" }}
            >
              ...
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 1,
                py: 1.5,
                borderRadius: 2,
                border: `2px solid ${theme.palette.primary.main}`,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? alpha(theme.palette.primary.main, 0.1)
                    : alpha(theme.palette.primary.main, 0.15),
              }}
            >
              <Typography
                sx={{
                  width: 26,
                  textAlign: "center",
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                }}
              >
                {currentUserRank}
              </Typography>
              <Avatar
                src={currentUser.avatar}
                sx={{ width: 48, height: 48, border: `2px solid ${theme.palette.primary.main}` }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography fontSize={15} fontWeight={700} color={theme.palette.primary.main}>
                  You ({currentUser.name})
                </Typography>
                <Typography fontSize={13} color="text.secondary">
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
              {currentUserRank === 1
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
                  backgroundColor:
                    currentUserRank === 1
                      ? theme.palette.success.main
                      : theme.palette.primary.main,
                },
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
