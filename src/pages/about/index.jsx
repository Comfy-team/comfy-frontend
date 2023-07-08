import styles from "./about.module.css";
import img from "../../assets/about.jpg";
import WhatTell from "./../../components/about/WhatTell";
import TabsContainer from "./../../components/about/TabsContainer";

const About = () => {
  return (
    <>
      <div
        id="about"
        className={`container  mb-5 aboutContainer${styles.aboutContainer}  p-5`}
      >
        <div className={` row `}>
          <div
            className={`${styles.imgContainer} imgContainer col-sm-12 col-md-6 mb-5`}
          >
            <img
              src={img}
              alt=""
              className="aboutImg  mx-auto d-block img-fluid d-block ms-auto mb-1"
            />
          </div>
          <div
            className={`${styles["contentContainer"]}   col-sm-12 col-md-6  `}
          >
            <TabsContainer />
          </div>
        </div>
      </div>
      <div className={`${styles.whatTellContainer} py-5 mb-2 `}>
        <WhatTell />
      </div>
    </>
  );
};

export default About;
