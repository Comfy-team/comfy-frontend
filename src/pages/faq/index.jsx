import styles from "./faq.module.css";
import "../../App.css";
const list = [
  {
    id: 1,
    heading: "Why An FAQ Resource?",
    content: `Firstly, FAQ pages can bring new visitors to your website via organic search and drive them quickly to related pages – most typically deeper blog pages and service pages closely related to the questions being resolved.

  Next, one of the most significant opportunities for impactful brand visibility within the search engine result pages (in-SERP) is targeting audience questions, wants, needs, and pain points.`,
  },
  {
    id: 2,
    heading: `Why FAQ Pages Are A Priority
  `,
    content: `FAQ pages continue to be a priority area for SEO and digital marketing professionals.

    An FAQ page is one of the simplest ways to improve your site and help site visitors and users.
    
    Your FAQ section should be seen as a constantly expanding source of value provided to your audience. It is a place where their ever-changing and growing requirements are not only met but anticipated and exceeded frequently.`,
  },
  {
    id: 3,
    heading: `Why FAQ Pages Are A Priority
  `,
    content: `FAQ pages continue to be a priority area for SEO and digital marketing professionals.

    An FAQ page is one of the simplest ways to improve your site and help site visitors and users.
    
    Your FAQ section should be seen as a constantly expanding source of value provided to your audience. It is a place where their ever-changing and growing requirements are not only met but anticipated and exceeded frequently.`,
  },
  {
    id: 4,
    heading: `Why FAQ Pages Are A Priority
  `,
    content: `FAQ pages continue to be a priority area for SEO and digital marketing professionals.

    An FAQ page is one of the simplest ways to improve your site and help site visitors and users.
    
    Your FAQ section should be seen as a constantly expanding source of value provided to your audience. It is a place where their ever-changing and growing requirements are not only met but anticipated and exceeded frequently.`,
  },
  {
    id: 5,
    heading: `Why FAQ Pages Are A Priority
  `,
    content: `FAQ pages continue to be a priority area for SEO and digital marketing professionals.

    An FAQ page is one of the simplest ways to improve your site and help site visitors and users.
    
    Your FAQ section should be seen as a constantly expanding source of value provided to your audience. It is a place where their ever-changing and growing requirements are not only met but anticipated and exceeded frequently.`,
  },
  {
    id: 6,
    heading: `Why FAQ Pages Are A Priority
  `,
    content: `FAQ pages continue to be a priority area for SEO and digital marketing professionals.

    An FAQ page is one of the simplest ways to improve your site and help site visitors and users.
    
    Your FAQ section should be seen as a constantly expanding source of value provided to your audience. It is a place where their ever-changing and growing requirements are not only met but anticipated and exceeded frequently.`,
  },
  {
    id: 7,
    heading: `Why FAQ Pages Are A Priority
  `,
    content: `FAQ pages continue to be a priority area for SEO and digital marketing professionals.

    An FAQ page is one of the simplest ways to improve your site and help site visitors and users.
    
    Your FAQ section should be seen as a constantly expanding source of value provided to your audience. It is a place where their ever-changing and growing requirements are not only met but anticipated and exceeded frequently.`,
  },
  {
    id: 8,
    heading: `Why FAQ Pages Are A Priority
  `,
    content: `FAQ pages continue to be a priority area for SEO and digital marketing professionals.

    An FAQ page is one of the simplest ways to improve your site and help site visitors and users.
    
    Your FAQ section should be seen as a constantly expanding source of value provided to your audience. It is a place where their ever-changing and growing requirements are not only met but anticipated and exceeded frequently.`,
  },
  {
    id: 9,
    heading: `Why FAQ Pages Are A Priority
  `,
    content: `FAQ pages continue to be a priority area for SEO and digital marketing professionals.

    An FAQ page is one of the simplest ways to improve your site and help site visitors and users.
    
    Your FAQ section should be seen as a constantly expanding source of value provided to your audience. It is a place where their ever-changing and growing requirements are not only met but anticipated and exceeded frequently.`,
  },
];

const FAQ = () => {
  return (
    <div className={`${styles.mainFaqContainer} container  `}>
      <div className={`${styles.faqcontainer}  row  w-100 m-s-5`}>
        <div
          className={`${styles.smallcolumn}  col-md-6 col-sm-12 col-lg-4  
          `}
        >
          <h1> frequently asked questions</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet tortor vel mi lacinia aliquam. Sed interdum sapien eget elit
            malesuada, eu faucibus libero bibendum. Sed iaculis vestibulum
          </p>
          <div className={`${styles.listoquestion}   mb-5`}>
            <a href="#faqpara0">condition</a>
            <a href="#faqpara1">terms condition</a>
            <a href="#faqpara2">terms condition</a>
            <a href="#faqpara3">payment options</a>
            <a href="#faqpara4">terms condition</a>
            <a href="#faqpara5">condition</a>
            <a href="#faqpara6">marketplace</a>
            <a href="#faqpara7">terms condition</a>
            <a href="#faqpara8">delivery job</a>
            <a href="#faqpara9">efficient</a>
          </div>
        </div>

        <div
          className={`${styles.largecolumn}  col-md-6 col-sm-12 col-lg-8    m-0   `}
        >
          {list.map(item => (
            <div key={item.id} className="">
              <h6
                className="text-uppercase font-weight-bold"
                id={`faqpara${item.id}`}
              >
                {" "}
                {item.heading}{" "}
              </h6>
              <p> {item.content} </p>
              <p />
            </div>
          ))}

          <p id="para5">payment options</p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
