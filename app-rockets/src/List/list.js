import React, { useEffect } from "react";
import { useState } from "react";
import "./list.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const List = () => {
  const navi = useNavigate();
  const [rocketsList, setrocketsList] = useState([]);

  const [page, setPage] = useState(1);
  const [length, setLength] = useState();
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("flight_number");
  const [order, setOrder] = useState("ascen");
  const [perPage, SetPerPage] = useState(10);

  useEffect(() => {
    getTodos();
    console.log("list");
  }, [filter]);

  useEffect(() => {
    changeTodos();
  }, [filter, sort, order, perPage, page]);

  const getTodos = async () => {
    let res = await axios.get(
      `https://api.spacexdata.com/v3/launches/${filter}`
    );
    setLength(res.data.length);
  };

  const changeTodos = async () => {
    let res = await axios.get(
      `https://api.spacexdata.com/v3/launches/${filter}?limit=${perPage}&offset=${(page - 1) * perPage }&sort=${sort}&order=${order}`
    );
    setrocketsList(res.data);
  };

  const onChange = (e) => {
    if (e.target.name === "filter") {
      setFilter(e.target.value);
      setPage(1);
    }
    if (e.target.name === "sort") {
      setSort(e.target.value);
    }
    if (e.target.name === "order") {
      setOrder(e.target.value);
    }
    if (e.target.name === "perpage") {
      SetPerPage(e.target.value);
      setPage(1);
    }
  };

  const handlePage = (event, value) => {
    setPage(value);
  };

  const moreDetails = (e, number) => {
    navi(`/rocketsList?number=${number}`);
  };

  return (
    <>
      <Container fixed>
        {console.log("list jsx")}
        <div className="filter">
          <div className="eachFilter">
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Filter
            </InputLabel>
            <NativeSelect
              defaultValue={""}
              onChange={(e) => onChange(e)}
              name="filter"
            >
              <option value={""}>All</option>
              <option value={"upcoming"}>Upcoming</option>
              <option value={"past"}>Past</option>
            </NativeSelect>
          </div>
          <div className="eachFilter">
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              sort
            </InputLabel>
            <NativeSelect
              defaultValue={"flight_number"}
              onChange={(e) => onChange(e)}
              name="sort"
            >
              <option value={"flight_number"}>Flight_number</option>
              <option value={"mission_name"}>Mission_name</option>
              <option value={"launch_year"}>Launch_year</option>
            </NativeSelect>
          </div>
          <div className="eachFilter">
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              order
            </InputLabel>
            <NativeSelect
              defaultValue={"ascen"}
              name="order"
              onChange={(e) => onChange(e)}
            >
              <option value={"asce"}>Ascending</option>
              <option value={"desc"}>Descending</option>
            </NativeSelect>
          </div>
          <div className="eachFilter">
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              PerPage
            </InputLabel>
            <NativeSelect
              defaultValue={10}
              name="perpage"
              onChange={(e) => onChange(e)}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={75}>75</option>
              <option value={100}>100</option>
            </NativeSelect>
          </div>
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {rocketsList.map((a, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      alt="rocket image"
                      height="140"
                      image={
                        a.links.flickr_images[0] ||
                        "https://upload.wikimedia.org/wikipedia/commons/9/9d/Rocket.jpg"
                      }
                    />
                    <CardContent>
                      <b>{a.flight_number}</b>
                      <Typography gutterBottom variant="h5" component="div">
                        {a.mission_name} , {a.launch_year}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {a.details || "Details not found"}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link to={a.links.wikipedia}> GET wikipedia details</Link>
                      <Button
                        size="small"
                        onClick={(e) => moreDetails(e, a.flight_number)}
                      >
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                
              </Grid>
            ))}
          </Grid>
        </Box>
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(length / perPage)}
            color="secondary"
            page={page}
            name="pagination"
            onChange={handlePage}
          />
        </Stack>
      </Container>
    </>
  );
};

export default List;
