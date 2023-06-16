import ContactInfo from "../../components/contact/contactInfo";
import Map from "../../components/contact/map";

const Contact = () => {
  return (
    <div id="contact">
    <div id="contactInfo" className="py-4">
      <ContactInfo/>
      </div>
      <div id="map" className="container py-5">
        <Map />
      </div>
    </div>
  );
};

export default Contact;