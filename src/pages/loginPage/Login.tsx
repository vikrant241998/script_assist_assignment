import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/useAuthStore";
import { Button, TextInput, ActionIcon } from "@mantine/core";
import logo from "../../assest/logo.png";
import "../../assest/login.css";

// Define the user type
interface User {
  email: string;
  password: string;
}

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = () => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const matchedUser = users.find(
      (user) => user.email === email && user.password === pass
    );

    if (matchedUser) {
      login();
      navigate("/dashboard"); 
    } else {
      alert("Invalid credentials or user not found.");
    }
  };

  return (
    <div className="bg-banner">
      <div className="login-wrapper">
        <div className="logo-contain">
          <img src={logo} alt="logo" />
          <h2>Welcome To Login Page</h2>
        </div>

        <TextInput
          className="log-input"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />

        <TextInput
          className="log-input"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={pass}
          onChange={(e) => setPass(e.currentTarget.value)}
          rightSection={
            <ActionIcon
              onClick={() => setShowPassword((prev) => !prev)}
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              {showPassword ? "👁‍🗨" : "👁"}
            </ActionIcon>
          }
        />

        <Button fullWidth mt="md" onClick={handleLogin}>
          Login
        </Button>

        <Button
          variant="subtle"
          fullWidth
          mt="sm"
          onClick={() => navigate("/signup")}
        >
          Don't have an account? Signup
        </Button>
      </div>
    </div>
  );
}
