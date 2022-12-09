import { Button, Card, CardHeader, Grid } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import IconButton from '@mui/material/IconButton'
import Table from '../src/Table';

export default function Home() {
  const [task, settask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (localStorage.getItem("localTasks")){
      const storedList = JSON.parse(localStorage.getItem("localTasks"));
      setTasks(storedList);
    }

  }, [])
  

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6} lg={4}></Grid>
      <Grid item xs={12} md={6} lg={4}></Grid>
      <Grid item xs={12} md={6} lg={4}></Grid>
      <Grid item xs={12} md={6} lg={4}></Grid>
    <Grid item xs={12} md={6} lg={4}>
      <Table />
    </Grid>
    </Grid>
  )
}
