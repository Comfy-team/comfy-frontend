import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import styles from "../../pages/about/about.module.css";

export default function TabsContainer() {
  return (
    <>
      <div className={`${styles.tabsContainer} tabsContainer mt-0 `}>
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className={`mb-3 ${styles[("active", "tabs")]} Tabs`}
          transition={true}
          fill
        >
          <Tab eventKey="home" title="Home">
            We Work In The Fields OfUI/UX Design, Photographyand Art Direction.
            Donec vehicula cursus vestibulum lectus, sit eros integer varius cum
            turpis et quam congue nisl accumsan. The top three occupations in
            the Beauty salons Industry Group are Hairdressers, hairstylists, &
            cosmetologists, Manicurists and pedicurists, Receptionists &
            information clerks, Supervisors of personal care and service
            workers, and Skincare specialists.
          </Tab>
          <Tab eventKey="profile" title="Profile">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a
            aliquet libero. Sed id sodales massa. Nullam vel sapien ac enim
            lacinia fermentum. Fusce accumsan ultricies velit, eu fermentum sem
            vehicula a. Donec vel nulla vitae ipsum sodales molestie. Curabitur
            aliquet justo et est vehicula, id eleifend eros aliquet. Praesent
          </Tab>
          <Tab eventKey="contact" title="Contact" className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a
            aliquet libero. Sed id sodales massa. Nullam vel sapien ac enim
            lacinia fermentum. Fusce accumsan ultricies velit, eu fermentum sem
            vehicula a. Donec vel nulla vitae ipsum sodales molestie. Curabitur
            aliquet justo et est vehicula, id eleifend eros aliquet. Praesent{" "}
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
