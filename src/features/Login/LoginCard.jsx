import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControlLabel,
  Checkbox,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../store/actions/authActions";
import { PrimaryActionButton, AppTextField } from "../../components";

export default function LoginCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    if (loading) return;
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) navigate("/");
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
          sx={{ fontWeight: 600, color: "#fff", mb: 3, textAlign: "center" }}
        >
          Welcome Back
        </Typography>

        {/* Email */}
        <AppTextField
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <AppTextField
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 1.5 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
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
          <Typography fontSize={13} sx={{ color: "#f87171", mb: 1 }}>
            {error}
          </Typography>
        )}

        {/* Remember + Forgot */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, mt: 1 }}>
          <FormControlLabel
            control={<Checkbox sx={{ color: "#fff", transform: "scale(1.5)" }} />}
            label={<Typography sx={{ color: "#ccc" }}>Remember me</Typography>}
          />
          <Link sx={{ color: "#60a5fa", cursor: "pointer" }}>Forgot Password?</Link>
        </Box>

        {/* Sign In */}
        <PrimaryActionButton
          fullWidth
          label="Sign In →"
          onClick={handleSubmit}
          disabled={loading}
          loading={loading}
          sx={{
            py: 1.4,
            borderRadius: "8px",
            background: "linear-gradient(to right, #2563eb, #3b82f6)",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            color: "#fff",
            "&:hover": {
              background: "linear-gradient(to right, #1d4ed8, #2563eb)",
            },
            "&:disabled": { opacity: 0.7 },
          }}
        />
      </CardContent>
    </Card>
  );
}
