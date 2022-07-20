import { Fragment } from "react";
import "./Aboutpage.css";
import bgcvideo from "../../src/assets/Nike_ What's Your Motivation_.mp4";
import runners from "../../src/assets/Nike-Eliud-About-Innovation_original.jpg";
import sociel from "../../src/assets/About-Nike-Community-Made-to-Play_original.jpg";
import ourteam from "../../src/assets/About-Nike-Team_original.jpg";
const AboutPage = () => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-12 text-center">
          <div className="topdiv">
            <video className="videoTag" autoPlay loop muted>
              <source src={bgcvideo} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div className="aboutnike">
        <h1>ABOUT NIKE</h1>
        <p>
          Our mission is what drives us to do everything possible to expand
          human potential. We do that by creating groundbreaking sport
          innovations, by making our products more sustainably, by building a
          creative and diverse global team and by making a positive impact in
          communities where we live and work. <br /> Based in Beaverton, Oregon,
          NIKE, Inc. includes the Nike, Converse, and Jordan brands.
        </p>
      </div>
      <div className="innvoation">
        <h2 style={{ textAlign: "center" }}>INNVOATION</h2>
        <hr />
        <h5 style={{ textAlign: "center" }}>
          WE DARE TO DESIGN THE FUTURE OF SPORT
        </h5>

        <div className="paragraph">
          <p>To make big leaps, we take big risks.</p>
        </div>
        <img src={runners} alt="" />
      </div>
      <div className="our-team">
        <h2 style={{ textAlign: "center" }}>OUR TEAM</h2>
        <hr />
        <h5 style={{ textAlign: "left", marginLeft: "20%" }}>
          A TEAM THAT'S EMPOWERD, DIVERSE AND INCLUSIVE
        </h5>

        <div className="paragraph1">
          <p>A love of sport unites us.</p>
        </div>
        <img src={ourteam} alt="" />
      </div>
      <div className="social">
        <h2 style={{ textAlign: "center" }}>SOCIAL & COMMUNITY IMPACT</h2>
        <hr />
        <h5 style={{ textAlign: "center" }}>THE WORLD IS OUR COMMUNITY</h5>

        <div className="paragraph">
          <p>We belive in the power of sport to move the world.</p>
        </div>
        <img src={sociel} alt="" />
      </div>
    </Fragment>
  );
};
export default AboutPage;
