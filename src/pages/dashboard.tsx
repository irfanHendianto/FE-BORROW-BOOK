import React, { useEffect } from 'react';
import Layout from '@/component/layout';
import router from 'next/router';

export default function Dashboard() {
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
    <Layout>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>Welcome to the Center</h1>
        <p>This is the dashboard page content.</p>
      </div>
    </Layout>
  );
}
