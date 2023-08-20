"use client";
import { Button } from "@mantine/core";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.main}>
        <h1>Welcome</h1>
        <Link href="/login" passHref>
          <Button color="blue">
            Login
          </Button>
        </Link>
    </div>
  );
}
