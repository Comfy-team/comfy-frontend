import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import styles from "./about.css";

import img from "../../assets/about.jpg";

const About = () => {
  return (
    <>
      <div
        id="about"
        className={`container  my-5 aboutContainer${styles.aboutContainer} `}
      >
        <div className="row ">
          <div
            className={`${styles.imgContainer} imgContainer col-sm-12 col-md-6 `}
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
            <div className={`${styles.tabsContainer} tabsContainer mt-0 `}>
              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className={`mb-3 ${styles[("active", "tabs")]} Tabs`}
                transition={true}
                fill
              >
                <Tab eventKey="home" title="Home">
                  We Work In The Fields OfUI/UX Design, Photographyand Art
                  Direction. Donec vehicula cursus vestibulum lectus, sit eros
                  integer varius cum turpis et quam congue nisl accumsan. The
                  top three occupations in the Beauty salons Industry Group are
                  Hairdressers, hairstylists, & cosmetologists, Manicurists and
                  pedicurists, Receptionists & information clerks, Supervisors
                  of personal care and service workers, and Skincare
                  specialists.
                </Tab>
                <Tab eventKey="profile" title="Profile">
                  Tab content for Profile rowrcol-6o wrow rowcol-6r col-6col-6ow
                  Profile ProfileProfileProfileProfile Profile Profile Profile
                  ProfileProfileProfileProfile Profile Profile Profile
                  ProfileProfileProfileProfile Profile Profile
                </Tab>
                <Tab eventKey="contact" title="Contact">
                  Tab content for Contact
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <div className="whatTellContainer">
        <div className="thecontent container row">
          <h1> what they're saying</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a
            aliquet libero. Sed id sodales massa. Nullam vel sapien ac enim
            lacinia fermentum. Fusce accumsan ultricies velit, eu fermentum sem
            vehicula a. Donec vel nulla vitae ipsum sodales molestie. Curabitur
            aliquet justo et est vehicula, id eleifend eros aliquet. Praesent
          </p>
          <h5> mohamad ali</h5>
          <h6> analyst</h6>
        </div>
      </div>
    </>
  );
};

export default About;
