import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Link,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/features/auth/authSlice";

export default function LoginCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (loading) return;

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      navigate("/");
    }
  };

  /* ---------------- Shared TextField Styles ---------------- */

  const textFieldSx = {
    mb: 2,
    input: { color: "#fff" },

    "& .MuiInputLabel-root": {
      color: "rgba(255,255,255,0.6)",
    },

    "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-shrink": {
      color: "#90caf9",
      backgroundColor: "rgba(15,23,42,1)",
      padding: "0 4px",
      transform: "translate(14px, -6px) scale(0.85)",
    },

    "& .MuiOutlinedInput-root fieldset": {
      borderColor: "rgba(255,255,255,0.15)",
    },

    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
      borderColor: "#60a5fa",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  };

  return (
    <Card
      sx={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(14px)",
        borderRadius: "14px",
        boxShadow: "0px 10px 40px rgba(0,0,0,0.35)",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: "#fff",
            mb: 3,
            textAlign: "center",
          }}
        >
          Welcome Back
        </Typography>

        {/* Email */}
        <TextField
          label="Email Address"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={textFieldSx}
        />

        {/* Password */}
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ ...textFieldSx, mb: 1.5 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((p) => !p)}
                  sx={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Error */}
        {error && (
          <Typography
            fontSize={13}
            sx={{ color: "#f87171", mb: 1 }}
          >
            {error}
          </Typography>
        )}

        {/* Remember + Forgot */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
            mt: 1,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: "#fff",
                  transform: "scale(1.5)",
                }}
              />
            }
            label={
              <Typography sx={{ color: "#ccc" }}>
                Remember me
              </Typography>
            }
          />

          <Link sx={{ color: "#60a5fa", cursor: "pointer" }}>
            Forgot Password?
          </Link>
        </Box>

        {/* Sign In */}
        <Button
          fullWidth
          disabled={loading}
          onClick={handleSubmit}
          sx={{
            py: 1.4,
            borderRadius: "8px",
            background:
              "linear-gradient(to right, #2563eb, #3b82f6)",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            color: "#fff",
            "&:hover": {
              background:
                "linear-gradient(to right, #1d4ed8, #2563eb)",
            },
            "&:disabled": {
              opacity: 0.7,
            },
          }}
        >
          {loading ? (
            <CircularProgress size={22} sx={{ color: "#fff" }} />
          ) : (
            "Sign In →"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
