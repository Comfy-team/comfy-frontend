import WhatTell from "./../../components/about/WhatTell";
import TabsContainer from "./../../components/about/TabsContainer";

import img from "../../assets/about.jpg";

import styles from "./about.module.css";

const About = () => {
  return (
    <>
      <div
        id="about"
        className={`container-fluid  mb-5    p-lg-5 p-md-5 p-sm-1`}
      >
        <div className={` row `}>
          <div
            className={` col-sm-12 col-lg-6  mb-6 h-lg-100 h-mb-100 h-sm-100`}
          >
            <img
              src={img}
              alt=""
              className="  mx-auto d-block img-fluid d-block mb-5 mb-md-4 mb-sm-3  "
            />
          </div>
          <div className={`  col-sm-12 col-lg-6 mb-6 `}>
            <TabsContainer />
          </div>
        </div>
      </div>
      <div className={`${styles.whatTellContainer} py-5  `}>
        <WhatTell />
      </div>
    </>
  );
};

export default About;
