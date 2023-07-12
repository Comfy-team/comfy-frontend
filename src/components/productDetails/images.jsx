import { useCallback, useEffect, useState } from "react";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlassPlus,
  faDownLeftAndUpRightToCenter,
} from "@fortawesome/free-solid-svg-icons";

// full screen
import { FullScreen, useFullScreenHandle } from "react-full-screen";

// components
import ImageMagnifier from "./imageMagnifier";
import FullScreenCarousel from "./fullScreenCarousel";
import Spinner from "../common/spinner";

// style
import style from "../../pages/productDetails/productDetails.module.css";

const Images = ({ imgs, name }) => {
  const [active, setActive] = useState({});
  const [showCarousel, setShowCarousel] = useState(false);
  const handle = useFullScreenHandle();

  const handleFullscreenChange = useCallback(
    (state, handle) => setShowCarousel(state),
    [handle]
  );

  const updateUrl = (url) => {
    return process.env.REACT_APP_BASE_URL + "/" + url.replace(/\\/g, "/");
  };

  const handleImgChange = (img) => {
    const activeImg = { ...img };
    activeImg.src = updateUrl(activeImg.src);
    setActive(activeImg);
  };

  useEffect(() => {
    if (imgs) {
      handleImgChange(imgs[0]);
    }
  }, [imgs]);

  return imgs ? (
    <>
      <FullScreen handle={handle} onChange={handleFullscreenChange}>
        {showCarousel ? (
          <>
            <button
              type="button"
              className={`${style["minimize-btn"]} border btn text-white position-absolute`}
              onClick={handle.exit}
            >
              <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} />
            </button>
            <FullScreenCarousel imgs={imgs} alt={name} />
          </>
        ) : (
          ""
        )}
      </FullScreen>
      <div className={`${style["sticky-top"]} position-sticky`}>
        <div className="row m-0">
          <div className="col-md-2 px-0 pe-md-3">
            <div className="d-flex flex-md-column gap-2 mb-md-0 mb-3">
              {imgs.map((img) => (
                <button
                  key={img._id}
                  type="button"
                  className={`${style["img-indicator"]} ${
                    img._id === active._id ? `${style.active}` : ""
                  } btn p-0 border`}
                  onClick={() => handleImgChange(img)}
                >
                  <img
                    src={process.env.REACT_APP_BASE_URL + "/" + img.src}
                    alt={name}
                    className="img-fluid"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="col-md-10 px-0 position-relative">
            <button
              onClick={handle.enter}
              className={`${style["zoom-btn"]} btn btn-bg-dark text-white rounded-circle d-flex justify-content-center align-items-center position-absolute`}
            >
              <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
              <span className="visually-hidden">zoom</span>
            </button>
            <ImageMagnifier key={active._id} src={active.src} alt={name} />
          </div>
        </div>
      </div>
    </>
  ) : (
    <Spinner />
  );
};

export default Images;
