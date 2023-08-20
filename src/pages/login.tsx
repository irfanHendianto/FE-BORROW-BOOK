import React, { useLayoutEffect, useState } from "react";
import {
  Button,
  TextInput,
  Container,
  Paper,
  Text,
  useMantineTheme,
} from "@mantine/core";
import styles from "../styles/Login.module.css";
import Link from "next/link";
import { apiRequest } from "@/utils/apiHelpers";
import { useRouter } from 'next/router'; 

export default function Login() {
  const theme = useMantineTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      router.push('/dashboard');
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Container size="xs" className={styles.container}>
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
export async function getServerSideProps() {
  const token = localStorage.getItem('token'); 

  if (token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
