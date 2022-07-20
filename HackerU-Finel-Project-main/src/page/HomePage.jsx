import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./HomePage.css";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";

import jordan from "../../src/assets/jordan.svg";
import jordanone from "../../src/assets/jordanone.jpg";
import jordantwo from "../../src/assets/jordantwo.webp";
import jordanthree from "../../src/assets/jordanthree.jpg";
import jordanfour from "../../src/assets/jordanfive.webp";
import jordanfive from "../../src/assets/jordansix.jpg";
import jordansix from "../../src/assets/jordanseven.webp";
import jordanseven from "../../src/assets/jordanfour.webp";
import nikelogo from "../../src/assets/nikelogo.png";
import womenrun from "../../src/assets/womenrun.jpg";
import menrun from "../../src/assets/menhomepage.webp";
import nikelink from "../../src/assets/nikelink.jpg";
import bgchomevideo from "../../src/assets/Best Day Ever _ Nike.mp4";

const HomePage = () => {
  return (
    <Fragment>
      <div className="nike">
        <h1>
          JUST DO IT. <br /> Nike
        </h1>
        <div className="video-container">
          <video className="homevideoTag" autoPlay loop muted>
            <source src={bgchomevideo} type="video/mp4" />
          </video>
        </div>
      </div>
      <br />
      <div className="jordan">
        <img src={jordan} alt="jordan" />

        <h1>MEET THE JORDAN SQUAD</h1>
        <h6>
          Jordan brand is excited to announce its first ever women’s <br />
          collective in Europe that will help us redefine basketball and sneaker
          culture for all.
        </h6>
        <Carousel
          className="main-slide"
          infiniteLoop={true}
          autoPlay={true}
          interval={2500}
          showStatus={false}
          dynamicHeight={true}
          showThumbs={true}
          showArrows={false}
          showIndicator={false}
        >
          <div>
            <img src={jordanone} alt="jordanshoes" />
            <h1 className="legend" style={{ fontSize: "1em" }}>
              Air Jordan 7 SE <br /> "Sapphire"
            </h1>
          </div>
          <div>
            <img src={jordantwo} alt="jordanshoes" />
            <p className="legend" style={{ fontSize: "1em" }}>
              Air Jordan 1 Mid <br /> "Linen"
            </p>
          </div>
          <div>
            <img src={jordanthree} alt="jordanshoes" />
            <p className="legend" style={{ fontSize: "1em" }}>
              Air jorden 11 Retro <br /> "Cool Grey 2021"
            </p>
          </div>
          <div>
            <img src={jordanfour} alt="jordanshoes" />
            <p className="legend" style={{ fontSize: "1em" }}>
              Air Jordan 1 High 85 <br /> "Georgetown"
            </p>
          </div>
          <div>
            <img src={jordanfive} alt="jordanshoes" />
            <p className="legend" style={{ fontSize: "1em" }}>
              Air Jordan 13 Retro <br /> "Del Sol"
            </p>
          </div>
          <div>
            <img src={jordansix} alt="jordanshoes" />
            <p className="legend" style={{ fontSize: "1em" }}>
              Air Jordan 1 High OG <br /> "Prototype"
            </p>
          </div>
          <div>
            <img src={jordanseven} alt="jordanshoes" />
            <p className="legend" style={{ fontSize: "1em" }}>
              Air Jordan 12 Retro <br /> "Playoffs 2022"
            </p>
          </div>
        </Carousel>
      </div>
      <div className="doit">
        <div className="justdoit">
          <h1>
            JUST DO IT. <img src={nikelogo} alt="justdoit" />
          </h1>
        </div>
      </div>
      <br />
      <div className="imagesfirstrow">
        <div className="nikecontainer">
          <img src={womenrun} alt="" className="NikeImage"></img>
          <div className="overlay">
            <div className="text">
              {" "}
              <p> Women Collation</p>
              <NavLink
                className="nav-links"
                aria-current="page"
                to="/nike/women"
                activeClassName="activeLink"
              >
                <img src={nikelink} alt="" className="nikeLogoStore" />
              </NavLink>
            </div>
          </div>
        </div>
        <div className="nikecontainer">
          <img src={menrun} alt="" className="NikeImage"></img>
          <div className="overlay">
            <div className="text">
              {" "}
              <p> Men Collation</p>
              <NavLink
                className="nav-links"
                aria-current="page"
                to="/nike/men"
                activeClassName="activeLink"
              >
                <img src={nikelink} alt="" className="nikeLogoStore" />
              </NavLink>
            </div>
          </div>
        </div>{" "}
      </div>{" "}
    </Fragment>
  );
};

export default HomePage;
