import React from "react";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "./carousel";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import "./detail.scss";

const Detail = () => {
  const [param] = useSearchParams();
  const [rocket, setRocket] = useState(null);

  useEffect(() => {
    console.log("hai")
    const getTodo = async () => {
      let res = await axios.get(
        `https://api.spacexdata.com/v3/launches/${param.get("number")}`
      );
      setRocket(res.data);
    };
    getTodo();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box>
          {rocket === null || (
            <div className="detailbox">
              {console.log(rocket)}
              <h1>DETAILS</h1>
               {rocket.links.flickr_images.length > 0 ? (
                <Carousel image={rocket.links.flickr_images} />
              ) : (
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Rocket.jpg"></img>
              )} 
              <h2>Flight Number : {rocket.flight_number}</h2>
              <h3>Mission Name : {rocket.mission_name}</h3>
              <h3>Details</h3>
              <p> {rocket.details || "Details not found"}</p>
              <h3>Launch_year: {rocket.launch_year}</h3>

              <Link to={rocket.links.wikipedia}> Wikipedia link</Link>
            </div>
          )}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Detail;
