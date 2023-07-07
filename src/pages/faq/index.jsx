import styles from "./faq.module.css";
import { list } from "./paragraphs";
import "../../App.css";

const FAQ = () => {
  return (
    <div className={`${styles.mainFaqContainer} container my-5  `}>
      <div className={`${styles.faqcontainer}  row my-5   w-100 m-s-5`}>
        <div
          className={`${styles.smallcolumn}  mt-5 col-md-6 col-sm-12 col-lg-4  
          `}
        >
          <h1> frequently asked questions</h1>
          <p>
            FAQ pages continue to be a priority area for SEO and digital
            marketing professionals. An FAQ page is one of the simplest ways to
            improve your site and help site visitors and users. Your FAQ section
            should be seen as a constantly expanding source of value provided to
            your audience.
          </p>
          <div className={`${styles.listoquestion}   mb-5`}>
            <a href="#e">e e </a>
            <a href="#faqpara3">LARGE ITEMS </a>
            <a href="#faqpara5">ASSEMBLED</a>
            <a href="#faqpara6">LIMITATION </a>
            <a href="#faqpara7">PRIORITY</a>
            <a href="#faqpara8">IDEA</a>
            <a href="#faqpara9"> ENVIRONMENTAL ISSUES</a>
          </div>
        </div>

        <div
          className={`${styles.largecolumn}  col-md-6 col-sm-12 col-lg-8     mt-5  `}
        >
          {list.map(item => (
            <div key={item.id} className="" id={`faqpara${item.id}`}>
              <h6 className="text-uppercase font-weight-bold">
                {item.id}- {item.heading}{" "}
              </h6>
              <p> {item.content} </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
