<<<<<<< HEAD
// LeaderboardCard.jsx
import { useState, useEffect } from "react";
=======
import { useState, useEffect } from 'react';
>>>>>>> b75ce4079ecb7e99ad1b4cb0c51f2ed6561506ef
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
<<<<<<< HEAD
} from "@mui/material";
=======
} from '@mui/material';
>>>>>>> b75ce4079ecb7e99ad1b4cb0c51f2ed6561506ef
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  EmojiEvents as EmojiEventsIcon,
  TrendingUp as TrendingUpIcon,
<<<<<<< HEAD
} from "@mui/icons-material";

// Import dummy users
import { users as dummyUsers } from "../../api/api"; // adjust path accordingly

=======
} from '@mui/icons-material';
import axios from 'axios';
>>>>>>> b75ce4079ecb7e99ad1b4cb0c51f2ed6561506ef

function LeaderboardCard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scope, setScope] = useState('global');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
<<<<<<< HEAD
        // simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        setUsers(dummyUsers);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
=======
        const response = await axios.get('/api/leaderboard');
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.users || [];
        setUsers(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setUsers([]);
>>>>>>> b75ce4079ecb7e99ad1b4cb0c51f2ed6561506ef
      } finally {
        setLoading(false);
      }
    };
<<<<<<< HEAD
  
    fetchLeaderboard();
  }, []);
  
=======

    fetchLeaderboard();
  }, []);

>>>>>>> b75ce4079ecb7e99ad1b4cb0c51f2ed6561506ef
  const getRankBadgeColor = (rank) => {
    switch (rank) {
      case 1:
        return '#fbbf24'; // Gold
      case 2:
        return '#94a3b8'; // Silver
      case 3:
        return '#cd7f32'; // Bronze
      default:
        return 'transparent';
    }
  };

  if (loading) {
    return (
      <Card sx={{ backgroundColor: 'background.paper', height: '100%' }}>
        <CardContent sx={{ p: 3 }}>
          <Skeleton variant="text" width={120} height={28} />
          <Box sx={{ mt: 3 }}>
            {[1, 2, 3, 4].map((item) => (
              <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Skeleton variant="circular" width={40} height={40} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  }

<<<<<<< HEAD
  const currentUser = Array.isArray(users) ? users.find(u => u.isCurrentUser) : null;

=======
  const currentUser = users.find((u) => u.isCurrentUser);
>>>>>>> b75ce4079ecb7e99ad1b4cb0c51f2ed6561506ef
  const topUsers = users.slice(0, 5);
  const progressToNextRank = currentUser ? ((currentUser.xp % 500) / 500) * 100 : 0;

  return (
    <Card
      sx={{
        backgroundColor: 'background.paper',
        height: '100%',
        margin: '0px 0px',
      }}
      data-testid="card-leaderboard"
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
            Leaderboard
          </Typography>
          <FormControl size="small">
            <Select
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              IconComponent={KeyboardArrowDownIcon}
              sx={{
                minWidth: 100,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'divider',
                },
                '& .MuiSelect-select': {
                  py: 0.75,
                  color: 'text.primary',
                  fontSize: '0.875rem',
                },
              }}
              data-testid="select-leaderboard-scope"
            >
              <MenuItem value="global">Global</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {topUsers.map((user, index) => (
            <Box
              key={user.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: user.isCurrentUser ? 2 : 0,
                borderRadius: user.isCurrentUser ? 2 : 0,
                backgroundColor: user.isCurrentUser ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                border: user.isCurrentUser ? '1px solid' : 'none',
                borderColor: 'primary.main',
              }}
              data-testid={`row-leaderboard-${user.id}`}
            >
              {index < 3 ? (
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    backgroundColor: getRankBadgeColor(index + 1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {index === 0 && (
                    <EmojiEventsIcon sx={{ fontSize: 16, color: '#7c2d12' }} />
                  )}
                  {index > 0 && (
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 700,
                        color: index === 1 ? '#1e293b' : '#3f2305',
                      }}
                    >
                      {index + 1}
                    </Typography>
                  )}
                </Box>
              ) : (
                <Typography
                  variant="body2"
                  sx={{
                    width: 28,
                    textAlign: 'center',
                    color: 'text.secondary',
                    fontWeight: 500,
                  }}
                >
                  {index + 1}
                </Typography>
              )}
              <Avatar
                src={user.avatar}
                alt={user.name}
                sx={{
                  width: 40,
                  height: 40,
                  border: user.isCurrentUser ? '2px solid' : 'none',
                  borderColor: 'primary.main',
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: user.isCurrentUser ? 'primary.main' : 'text.primary',
                    }}
                    data-testid={`text-username-${user.id}`}
                  >
                    {user.isCurrentUser ? `You (${user.name})` : user.name}
                  </Typography>
                  {user.isCurrentUser && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.25,
                        color: 'success.main',
                      }}
                    >
                      <TrendingUpIcon sx={{ fontSize: 14 }} />
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        +2
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {user.xp.toLocaleString()} XP
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {currentUser && currentUser.rank > 5 && (
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 1,
                color: 'text.disabled',
              }}
            >
              <Typography variant="caption">...</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: 2,
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid',
                borderColor: 'primary.main',
              }}
              data-testid="row-current-user"
            >
              <Typography
                variant="body2"
                sx={{
                  width: 28,
                  textAlign: 'center',
                  color: 'primary.main',
                  fontWeight: 600,
                }}
              >
                {currentUser.rank}
              </Typography>
              <Avatar
                src={currentUser.avatar}
                alt={currentUser.name}
                sx={{
                  width: 40,
                  height: 40,
                  border: '2px solid',
                  borderColor: 'primary.main',
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: 'primary.main' }}
                  >
                    You ({currentUser.name})
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.25,
                      color: 'success.main',
                    }}
                  >
                    <TrendingUpIcon sx={{ fontSize: 14 }} />
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      +2
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {currentUser.xp.toLocaleString()} XP
                </Typography>
              </Box>
            </Box>
          </>
        )}

        <Box sx={{ mt: 3 }}>
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', display: 'block', mb: 1 }}
          >
            Progress to Rank #{currentUser ? currentUser.rank - 1 : 6}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progressToNextRank}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'primary.main',
                borderRadius: 4,
              },
            }}
            data-testid="progress-next-rank"
          />
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', display: 'block', mt: 1 }}
          >
            320 XP away from next rank
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default LeaderboardCard;
