import React from "react";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

export default function TabsContainer() {
  return (
    <div className={`tabsContainer mt-0 `}>
      <Tabs
        defaultActiveKey="history"
        id="uncontrolled-tab-example"
        className={`mb-3  Tabs`}
        transition={true}
        fill
      >
        <Tab eventKey="history" title="history">
          Our company was founded in 2019 by a group of young designers who were
          passionate about creating modern, affordable furniture. They started
          out with a small line of minimalist furniture, including tables,
          chairs, and sofas, that quickly gained popularity among design
          enthusiasts.
          <br />
          In 2020, we launched an online store and began shipping our furniture
          all over the world. We also expanded our product line to include home
          decor items, such as wall art and lighting, which helped to attract a
          wider audience.
          <br />
          Today, our company continues to grow and thrive, thanks to our
          commitment to innovation, affordability, and sustainability. We remain
          dedicated to providing our customers with beautiful, functional
          furniture that enhances their homes and lives, while also making a
          positive impact on the environment.
        </Tab>
        <Tab eventKey="mission" title="mission">
          At our company, we are committed to creating modern, affordable
          furniture that enhances our customers' homes and lives. Our mission is
          to combine beautiful design with high-quality craftsmanship, while
          also minimizing our impact on the environment.
          <br />
          To achieve our mission, we embrace the following core values:
          <br />
          <b class="font-weight-bold"> Innovation:</b>
          We are constantly pushing the boundaries of design and manufacturing,
          using technology and creativity to create furniture that is both
          functional and beautiful.
          <br /> <b> Affordability:</b> We believe that high-quality, stylish
          furniture should be accessible to everyone. <br />
          That's why we strive to keep our prices affordable, without
          compromising on quality or design.
          <br />
          <b> Sustainability:</b>
          We are committed to using eco-friendly materials and practices in all
          of our operations, from sourcing materials to manufacturing and
          shipping our products.
          <br />
          <b> Customer Focus:</b>
          We prioritize the needs and preferences of our customers, and strive
          to create furniture that is tailored to their unique style and needs.
          <br />
        </Tab>
        <Tab eventKey="  Design " title="  Design ">
          At our company, we believe that great design should be both beautiful
          and functional. <br />
          Our approach to furniture design is centered around the following
          principles:
          <br /> <b> Simplicity:</b>We believe that furniture should be simple
          and uncluttered, with clean lines and minimal ornamentation. We strive
          to create furniture that is both timeless and contemporary, so that it
          can fit seamlessly into any home or office environment. <br />
          <b> Functionality:</b> We design furniture with the user in mind,
          prioritizing functionality and comfort. We believe that furniture
          should not only look great, but also serve a purpose and make people's
          lives easier and more comfortable.
          <br />
          <b> Sustainability:</b> We are committed to using sustainable
          materials and production techniques in all of our furniture. We
          believe that sustainable design is not only better for the
          environment, but also leads to longer-lasting and more durable
          furniture. <br />
          <b>Customization: </b>
          We understand that every person's taste and style is unique, and we
          offer customization options to allow our customers to create furniture
          that truly reflects their individual preferences and needs. <br />
        </Tab>
      </Tabs>
    </div>
  );
}
