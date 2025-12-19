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
  Skeleton,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { KeyboardArrowDown as KeyboardArrowDownIcon, EmojiEvents as EmojiEventsIcon } from "@mui/icons-material";
import { getLeaderboardUsers } from "../../../../store/features/leaderboard/leaderboardSlice";
import ProgressBar from "../../../../components/progressbar/ProgressBar";
import DropdownList from "../../../../components/dropdowns/DropdownList";
const defaultAvatars = [
  "https://mui.com/static/images/avatar/1.jpg",
  "https://mui.com/static/images/avatar/2.jpg",
  "https://mui.com/static/images/avatar/3.jpg",
  "https://mui.com/static/images/avatar/4.jpg",
];

export default function Leaderboard() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { users = [], loading } = useSelector((state) => state.leaderboard || {});
  const { user: currentUserRaw } = useSelector((state) => state.auth || {});
  const [scope, setScope] = useState("global");

  useEffect(() => {
    dispatch(getLeaderboardUsers());
  }, [dispatch]);

  const normalizeUsers = (users) =>
    users.map((u, i) => ({
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
        totalXP: Number(currentUserRaw.total_xp ?? currentUserRaw.totalXP ?? currentUserRaw.xp ?? 0),
      }
    : null;

  const filteredUsers =
    scope === "college" && currentUser?.college
      ? normalizeUsers(users).filter((u) => u.college === currentUser.college)
      : normalizeUsers(users);

  // ----------- Rank Users Function -----------
  const rankUsers = (users) => {
    const sorted = [...users].sort((a, b) => b.totalXP - a.totalXP);
    let rank = 0, prevXP = null, sameCount = 0;

    return sorted.map((u) => {
      if (u.totalXP === prevXP) sameCount++;
      else { rank += 1 + sameCount; sameCount = 0; }
      prevXP = u.totalXP;
      return { ...u, rank };
    });
  };

  const rankedUsers = rankUsers(filteredUsers);
  const topUsers = rankedUsers.slice(0, 5);
  const currentUserRank = currentUser ? rankedUsers.find((u) => u.id === currentUser.id)?.rank : null;

  const firstXP = rankedUsers[0]?.totalXP ?? 0;
  const myXP = currentUser?.totalXP ?? 0;
  const xpToFirst = Math.max(0, firstXP - myXP);
  const progressToFirst = firstXP > 0 ? Math.min(100, (myXP / firstXP) * 100) : 0;

  // ----------- Row Background Helper -----------
  const getRowBg = (rank, isMe) => {
    if (isMe) return theme.palette.action.selected;
    if (rank === 1) return theme.palette.mode === "dark" ? alpha(theme.palette.warning.main, 0.25) : theme.palette.warning.light;
    if (rank === 2 || rank === 3) return theme.palette.action.hover;
    return "transparent";
  };

  // ----------- Loading Skeleton -----------
  if (loading) {
    return (
      <Card sx={{ backgroundColor: theme.palette.background.paper, minWidth: 392, minHeight: 500, borderRadius: 3 }}>
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
    <Card sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 3, minWidth: 392, minHeight: 500, width: "100%", height: "100%" }}>
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6" fontWeight={700}>Leaderboard</Typography>
          <DropdownList
  value={scope}
  onChange={(e) => setScope(e.target.value)}
  IconComponent={KeyboardArrowDownIcon}
  size="small"
  sx={{ minWidth: 130 }}
  options={[
    { value: "global", label: "Global" },
    {
      value: "college",
      label: currentUser?.college ? "College" : "College (N/A)",
      disabled: !currentUser?.college,
    },
  ]}
  disableFocus={true}
/>
        </Box>

        {/* Top Users */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
          {topUsers.map((u) => {
            const isMe = u.id === currentUser?.id;
            return (
              <Box key={u.id} sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 1, py: 1, borderRadius: 2, backgroundColor: getRowBg(u.rank, isMe), border: isMe ? `2px solid ${theme.palette.primary.main}` : "none" }}>
                <Box sx={{ width: 26, textAlign: "center", fontWeight: 600 }}>
                  {u.rank === 1 ? <EmojiEventsIcon sx={{ fontSize: 18, color: theme.palette.mode === "dark" ? theme.palette.warning.light : theme.palette.warning.main }} /> : u.rank}
                </Box>
                <Avatar src={u.avatar} sx={{ width: isMe ? 48 : 42, height: isMe ? 48 : 42, border: isMe ? `2px solid ${theme.palette.primary.main}` : "none" }} />
                <Box sx={{ flex: 1 }}>
                  <Typography fontSize={isMe ? 15 : 14} fontWeight={isMe ? 700 : 600} color={isMe ? theme.palette.primary.main : "inherit"}>
                    {isMe ? `You (${u.name})` : u.name}
                  </Typography>
                  <Typography fontSize={12} color="text.secondary">{u.totalXP.toLocaleString()} XP</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Current User if not top 5 */}
        {currentUser && currentUserRank > 5 && (
          <>
            <Typography sx={{ textAlign: "center", my: 1, letterSpacing: 2, color: "text.secondary" }}>...</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 1, py: 1.5, borderRadius: 2, border: `2px solid ${theme.palette.primary.main}`, backgroundColor: theme.palette.mode === "dark" ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.primary.main, 0.15) }}>
              <Typography sx={{ width: 26, textAlign: "center", fontWeight: 700, color: theme.palette.primary.main }}>{currentUserRank}</Typography>
              <Avatar src={currentUser.avatar} sx={{ width: 48, height: 48, border: `2px solid ${theme.palette.primary.main}` }} />
              <Box sx={{ flex: 1 }}>
                <Typography fontSize={15} fontWeight={700} color={theme.palette.primary.main}>You ({currentUser.name})</Typography>
                <Typography fontSize={13} color="text.secondary">{myXP.toLocaleString()} XP</Typography>
              </Box>
            </Box>
          </>
        )}

        {/* Progress Bar */}
        {currentUser && (
          <Box sx={{ mt: 3 }}>
            <ProgressBar
              value={progressToFirst}
              label={currentUserRank === 1 ? "Rank #1 🎉" : `${xpToFirst.toLocaleString()} XP to Rank #1`}
              color={theme.palette.primary.main}
              backgroundColor={theme.palette.grey[200]}
              height={8}
              containerSx={{ mt: 2 }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
