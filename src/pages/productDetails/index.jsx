import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// components
import axiosInstance from "./../../apis/config";
import Images from "../../components/productDetails/images";
import Details from "../../components/productDetails/details";
import FullDescription from "../../components/productDetails/fullDescription";
import RelatedProducts from "../../components/productDetails/relatedProducts";
import Brands from "../../components/common/brands";
import FollowUs from "../../components/common/followUs";
import Spinner from "../../components/common/spinner";

const ProductDetails = () => {
  const [data, setData] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axiosInstance
      .get(`/products/${id}`)
      .then(async (res) => {
        setData(res.data);
        await axiosInstance
          .get("/products", {
            params: {
              page: 1,
              price: 0,
              category: res.data.category,
            },
          })
          .then((productsRes) => setRelatedProducts(productsRes.data.data))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, [id]);

  return data ? (
    <div id="prodcut-details" className="pb-5">
      <div className="container-fluid border-bottom py-5">
        <div className="row m-0 mb-5">
          <div className="col-lg-6 col-md-6 mb-md-0 mb-4">
            <Images imgs={data?.images} />
          </div>
          <div className="col-lg-6 col-md-6">
            <Details product={data} />
          </div>
        </div>
        <FullDescription description={data?.description} name={data?.name} />
      </div>
      <RelatedProducts data={relatedProducts} />
      <Brands />
      <FollowUs />
    </div>
  ) : (
    <div className="py-5 my-5">
      <Spinner />
    </div>
  );
};

export default ProductDetails;
