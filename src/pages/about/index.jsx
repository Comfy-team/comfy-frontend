import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import styles from "./about.module.css";
import img from "../../assets/about.jpg";

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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam a aliquet libero. Sed id sodales massa. Nullam vel
                  sapien ac enim lacinia fermentum. Fusce accumsan ultricies
                  velit, eu fermentum sem vehicula a. Donec vel nulla vitae
                  ipsum sodales molestie. Curabitur aliquet justo et est
                  vehicula, id eleifend eros aliquet. Praesent
                </Tab>
                <Tab eventKey="contact" title="Contact" className="">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam a aliquet libero. Sed id sodales massa. Nullam vel
                  sapien ac enim lacinia fermentum. Fusce accumsan ultricies
                  velit, eu fermentum sem vehicula a. Donec vel nulla vitae
                  ipsum sodales molestie. Curabitur aliquet justo et est
                  vehicula, id eleifend eros aliquet. Praesent{" "}
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.whatTellContainer} py-5 `}>
        <div className={`${styles.thecontent} container row`}>
          <h1 className={`pt-5 `}> what they're saying</h1>
          <p className={`pb-3 pt-5`}>
            " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a
            aliquet libero. Sed id sodales massa. Nullam vel sapien ac enim
            lacinia fermentum. Fusce accumsan ultricies velit, eu fermentum sem
            vehicula a. Donec vel nulla vitae ipsum sodales molestie. Curabitur
            aliquet justo et est vehicula, id eleifend eros aliquet. Praesent "
          </p>
          <h5> mohamad ali</h5>
          <div>
            <h6 className=" mb-5 pb-5"> analyst</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
