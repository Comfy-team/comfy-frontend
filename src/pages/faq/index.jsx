import styles from "./faq.module.css";
import { list } from "./paragraphs";

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
          {list.map((item, index) => (
            <div
              key={item.id}
              className={index > 0 ? "pt-5" : ""}
              id={`faqpara${item.id}`}
            >
              <h2 className={`text-uppercase h6 ${index > 0 ? "pt-3" : ""}`}>
                {" "}
                {item.id}- {item.heading}{" "}
              </h2>
              <p className="mb-0"> {item.content} </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
