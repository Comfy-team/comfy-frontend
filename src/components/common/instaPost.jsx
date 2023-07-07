import { useState } from "react";

const InstaPost = ({ src, alt = "" }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <img
        src={src}
        alt={alt}
        className="d-block img-fluid"
        onLoad={() => {
          setLoaded(true);
        }}
        loading="lazy"
      />
      {!loaded && (
        <div className="loading-img position-absolute w-100 top-0 start-0"></div>
      )}
    </>
  );
};

export default InstaPost;
