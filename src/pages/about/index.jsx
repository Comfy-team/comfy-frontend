import WhatTell from "./../../components/about/WhatTell";
import TabsContainer from "./../../components/about/TabsContainer";

import img from "../../assets/about.jpg";

import styles from "./about.module.css";

const About = () => {
  return (
    <>
      <div id="about" className={`container  mb-5   p-5 aboutContainer`}>
        <div className={` row `}>
          <div className={` col-sm-12 col-md-6 mb-5`}>
            <img
              src={img}
              alt=""
              className="  mx-auto d-block img-fluid d-block ms-auto mb-1"
            />
          </div>
          <div className={`  col-sm-12 col-md-6  `}>
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
