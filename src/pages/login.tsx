import React, { useEffect, useState } from "react";
import {
  Button,
  TextInput,
  Container,
  Paper,
  Text,
  useMantineTheme,
  Modal,
} from "@mantine/core";
import styles from "../styles/Login.module.css";
import Link from "next/link";
import { apiRequest } from "@/utils/apiHelpers";
import { useRouter } from "next/router";

export default function Login() {
  const theme = useMantineTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorModalOpened, setErrorModalOpened] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await apiRequest({
        method: "POST",
        url: "/auth/login",
        data: {
          email: username,
          password: password,
        },
      });
      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch (error) {
      console.log("🚀 ~ file: login.tsx:37 ~ handleLogin ~ error:", error);
      setErrorMessage("There was an error while trying to log in.");
      setErrorModalOpened(true);
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("asdasd");
      const token = localStorage.getItem("token");
      if (token) {
        router.push("/dashboard");
      }
    }
  }, [router]);

  return (
    <Container size="xs" className={styles.container}>
       <Modal
        opened={errorModalOpened}
        onClose={() => setErrorModalOpened(false)}
        title="Login Error"
        size="sm"
        centered // Center the modal
      >
        <div>{errorMessage}</div>
        <div style={{ marginTop: theme.spacing.sm }}>
          <Button
            fullWidth
            color="red"
            onClick={() => setErrorModalOpened(false)}
          >
            Close
          </Button>
        </div>
      </Modal>
      <Paper p="md" shadow="xs" className={styles.paper}>
        <Text
          align="center"
          size="xl"
          style={{ marginBottom: theme.spacing.md }}
        >
          Login
        </Text>
        <TextInput
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
          style={{ marginBottom: theme.spacing.sm }}
        />
        <TextInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          style={{ marginBottom: theme.spacing.md }}
        />
        <Button fullWidth color="blue" onClick={handleLogin}>
          Log In
        </Button>
        <Link href="/register" passHref className={styles.registerLink}>
          Register
        </Link>
      </Paper>
    </Container>
  );
}
