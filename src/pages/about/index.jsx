import WhatTell from "./../../components/about/WhatTell";
import TabsContainer from "./../../components/about/TabsContainer";

import img from "../../assets/about.jpg";

import styles from "./about.module.css";

const About = () => {
  return (
    <>
      <div id="about" className={`container-fluid mb-5 py-5 px-lg-5 px-2`}>
        <div className={`row mx-0 mb-5`}>
          <div className={`col-sm-12 col-lg-6 mb-5 mb-lg-0`}>
            <img
              src={img}
              alt=""
              className="mx-auto d-block img-fluid d-block"
            />
          </div>
          <div className={`col-sm-12 col-lg-6`}>
            <TabsContainer />
          </div>
        </div>
      </div>
      <div className={`${styles.whatTellContainer} py-5`}>
        <WhatTell />
      </div>
    </>
  );
};

export default About;
