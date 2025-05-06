import { Button, TextInput, ActionIcon } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import logo from "../../assest/logo.png";
import { useState } from "react";
import "../../assest/login.css";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignup = () => {
    if (!firstName || !lastName || !email || !pass || !confirmPass) {
      alert("Please fill all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Invalid email format.");
      return;
    }

    if (pass !== confirmPass) {
      alert("Passwords do not match.");
      return;
    }

    const newUser = {
      firstName,
      lastName,
      email,
      password: pass,
    };

    const existingUsersData = localStorage.getItem("users");
    const existingUsers = existingUsersData
      ? JSON.parse(existingUsersData)
      : [];

    const userExists = existingUsers.find((user: any) => user.email === email);
    if (userExists) {
      alert("User already exists. Please login.");
      return;
    }

    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Signup successful! Please login.");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPass("");
    setConfirmPass("");
    navigate("/login");
  };

  return (
    <>
      <div className="bg-banner">
        <div className="login-wrapper">
          <div className="logo-contain">
            <img src={logo} alt="logo" />
            <h2>Welcome To Signup Page</h2>
          </div>

          <TextInput
            className="log-input"
            label="First Name"
            placeholder="your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)}
          />

          <TextInput
            className="log-input"
            label="Last Name"
            placeholder="your last name"
            value={lastName}
            onChange={(e) => setLastName(e.currentTarget.value)}
          />

          <TextInput
            className="log-input"
            label="Email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />

          <TextInput
            className="log-input"
            label="Password"
            placeholder="your password"
            type={showPassword ? "text" : "password"}
            value={pass}
            onChange={(e) => setPass(e.currentTarget.value)}
            rightSection={
              <ActionIcon
                onClick={() => setShowPassword((prev) => !prev)}
                sx={{ "&:hover": { backgroundColor: "transparent" } }}
              >
                {showPassword ? "👁‍🗨" : "👁"}
              </ActionIcon>
            }
          />

          <TextInput
            className="log-input"
            label="Confirm Password"
            placeholder="Confirm password"
            type={showPassword ? "text" : "password"}
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.currentTarget.value)}
            rightSection={
              <ActionIcon
                onClick={() => setShowPassword((prev) => !prev)}
                sx={{ "&:hover": { backgroundColor: "transparent" } }}
              >
                {showPassword ? "👁‍🗨" : "👁"}
              </ActionIcon>
            }
          />

          <Button fullWidth mt="md" onClick={handleSignup}>
            Signup
          </Button>
          <Button
            variant="subtle"
            fullWidth
            mt="sm"
            onClick={() => navigate("/login")}
          >
            Already have an account? Login
          </Button>
        </div>
      </div>
    </>
  );
}
