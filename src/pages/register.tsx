"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  TextInput,
  Container,
  Paper,
  Text,
  useMantineTheme,
} from "@mantine/core";
import styles from "../styles/Register.module.css";
import { apiRequest } from "@/utils/apiHelpers";
import router from 'next/router';

export default function Register() {
  const theme = useMantineTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await apiRequest({
        method: "POST",
        url: "/auth/register",
        data: {
          name: name,
          email: email,
          password: password,
        },
      });

      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log("asdasd")
      const token = localStorage.getItem('token');
      if (token) {
        router.push('/dashboard');
      }
    }
  }, [router]);

  return (
    <Container size="xs" className={styles.container}>
      <Paper p="md" shadow="xs" className={styles.paper}>
        <Text
          align="center"
          size="xl"
          style={{ marginBottom: theme.spacing.md }}
        >
          Register
        </Text>
        <TextInput
          label="Name"
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
          style={{ marginBottom: theme.spacing.sm }}
        />
        <TextInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
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
        <Button fullWidth color="green" onClick={handleRegister}>
          Register
        </Button>
      </Paper>
    </Container>
  );
}
