import style from "./faq.module.css";
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
    <div className={`mt-5 ${style.mainFaqContainer} container  `}>
      <div className={`${style.faqcontainer}  row  w-100 m-s-5`}>
        <div
          className={`${style.smallcolumn}  col-md-6 col-sm-12 col-lg-4  
          `}
        >
          <h1> frequently asked questions</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet tortor vel mi lacinia aliquam. Sed interdum sapien eget elit
            malesuada, eu faucibus libero bibendum. Sed iaculis vestibulum
          </p>
          <div
            className={`${style.listoquestion}   mb-5
          `}
          >
            <p>company polices </p>
            <p>payment options</p>
            <p>terms condition</p>
            <p>marketplace</p>
            <p>condition</p>
            <p>delivery job</p>
            <p>efficient</p>
          </div>
        </div>

        <div
          className={`${style.largecolumn}  col-md-6 col-sm-12 col-lg-8    m-0   `}
        >
          {list.map(item => (
            <div key={item.id} className="">
              <h6 className="text-uppercase font-weight-bold">
                {" "}
                {item.heading}{" "}
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
