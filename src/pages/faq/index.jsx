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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet tortor vel mi lacinia aliquam. Sed interdum sapien eget elit
            malesuada, eu faucibus libero bibendum. Sed iaculis vestibulum
          </p>
          <div className={`${styles.listoquestion}   mb-5`}>
            <a href="#faqpara3">payment options</a>
            <a href="#faqpara5">condition</a>
            <a href="#faqpara6">marketplace</a>
            <a href="#faqpara7">terms condition</a>
            <a href="#faqpara8">delivery job</a>
            <a href="#faqpara9">efficient</a>
          </div>
        </div>

        <div
          className={`${styles.largecolumn}  col-md-6 col-sm-12 col-lg-8     mt-5  `}
        >
          {list.map(item => (
            <div key={item.id} className="">
              <h6
                className="text-uppercase font-weight-bold"
                id={`faqpara${item.id}`}
              >
                {" "}
                {item.id}- {item.heading}{" "}
              </h6>
              <p> {item.content} </p>
              <p />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
