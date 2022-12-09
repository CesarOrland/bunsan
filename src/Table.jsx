import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  LinearProgress,
  Typography,
  Row,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
} from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import IconButton from "@mui/material/IconButton";

export default function Table() {
  const [task, setTask] = useState("");
  const [name, setName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState();
  const [tipo, setTipo] = useState("");

  useEffect(() => {
    if (localStorage.getItem("localTasks")) {
      const storedList = JSON.parse(localStorage.getItem("localTasks"));
      setTasks(storedList);
    }
  }, []);

  function randomUser(max) {
    return Math.floor(Math.random() * max);
  }

  const addTask = (e) => {
    if (task) {
      console.log(task);
      const newTask = {
        id: randomUser(10),
        userId: randomUser(100),
        name: name,
        title: task,
        completed: "false",
        progress: 100,
        amount:
          task == "Manager A"
            ? 300
            : task == "Manager B"
            ? 300
            : task == "Developer"
            ? 1000
            : 500,
        subtitle: "Vuejs, React & HTML",
      };
      setTasks([...tasks, newTask]);
      localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask, ]));
    }
  };

  const sumall = tasks
    .map((item) => item.amount)
    .reduce((prev, curr) => prev + curr, 0);
  console.log(sumall);

  return (
    <Card>
              <CardHeader
        title="Department workers"
        titleTypographyProps={{
          sx: {
            lineHeight: "1.6 !important",
            letterSpacing: "0.15px !important",
          },
        }}
      />
      <Input
        name="title"
        type="text"
        value={name}
        placeholder="Write your task..."
        className="form=control"
        style={{
          width: 200,
          height: 25,
          borderColor: "#1A1A1A",
          borderRadius: 20,
          padding: 10,
          marginLeft: 30,
          
        }}
        onChange={(e) => setName(e.target.value)}
      />
      <Grid item xs={12} mt={5} ml={3} sm={8}>
        <FormControl fullWidth>
          <InputLabel id="form-layouts-separator-select-label">
            Select
          </InputLabel>
          <Select
            label="Select"
            defaultValue=""
            id="form-layouts-separator-select"
            labelId="form-layouts-separator-select-label"
            onChange={(e) => {
              setTask(e.target.value);
            }}
            value={task}
          >
            <MenuItem value={"Manager A"}>Manager A</MenuItem>
            <MenuItem value={"Manager B"}>Manager B</MenuItem>
            <MenuItem value={"Developer"}>Developer</MenuItem>
            <MenuItem value={"QA Tester"}>QA Tester</MenuItem>
          </Select>
        </FormControl>
        <Button
          style={{ margin: 10 }}
          type="submit"
          variant="contained"
          onClick={addTask}
        >
          add
        </Button>
      </Grid>

      <CardContent>
        {tasks.map((item, index) => {
          return (
            <Box
              key={item.title}
              sx={{
                display: "flex",
                alignItems: "center",
                ...(index !== data.length - 1 ? { mb: 3.5 } : {}),
              }}
            >
              <Avatar
                variant="rounded"
                sx={{
                  mr: 3,
                  width: 40,
                  height: 40,
                }}
              ></Avatar>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    marginRight: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ mb: 0.5, fontWeight: 600, color: "text.primary" }}
                  >
                    {item.name}
                  </Typography>
                  <Typography variant="caption">{item.title}</Typography>
                </Box>

                <Box
                  sx={{
                    minWidth: 85,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ mb: 2, fontWeight: 600, color: "text.primary" }}
                  >
                    {item.amount}
                  </Typography>
                  <LinearProgress
                    color={item.color}
                    value={item.progress}
                    variant="determinate"
                  />
                </Box>
              </Box>
            </Box>
          );
        })}

        <Box sx={{ mb: 0.5, mt: 2.5, display: "flex", alignItems: "center" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 600, fontSize: "2.125rem !important" }}
          >
            Total: ${sumall}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
