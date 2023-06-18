// style
import style from "../../pages/productDetails/productDetails.module.css";

const FullDescription = ({ description }) => {
  return (
    <div>
      <h2 className="h5 text-center border-top border-bottom">
        <span
          className={`${style["full-description-title"]} d-inline-block py-3 h-100 position-relative`}
        >
          Description
        </span>
      </h2>
      <p
        className={`${style["full-description"]} px-lg-0 px-md-5 px-sm-4 px-3 text-center pt-4 mx-auto lh-lg color-main-gray`}
      >
        {description}
      </p>
    </div>
  );
};

export default FullDescription;
