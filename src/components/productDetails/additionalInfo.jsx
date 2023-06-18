// style
import style from "../../pages/productDetails/productDetails.module.css";

const AdditionalInfo = ({ product }) => {
  return (
    <ul className={`${style["additional-info-list"]} list-unstyled`}>
      <li className="mb-2">
        <span className={`${style.key} d-inline-block color-main-gray`}>Vendor:</span>
        <span className="color-secondary-gray">{product.brand.name}</span>
      </li>
      <li className="mb-2">
        <span className={`${style.key} d-inline-block color-main-gray`}>SKU:</span>
        <span className="color-secondary-gray">N/A</span>
      </li>
      <li>
        <span className={`${style.key} d-inline-block color-main-gray`}>Category:</span>
        <span className="color-secondary-gray text-capitalize">{product.category.name}</span>
      </li>
    </ul>
  );
};

export default AdditionalInfo;
