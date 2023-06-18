import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronUp } from "@fortawesome/free-solid-svg-icons";

const ScrollToTopBtn = () => {
  const [showButton, setShowButton] = useState(false);
  const handleFlowClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && !showButton) {
        setShowButton(true);
      } else if (window.scrollY <= 300 && !showButton) {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <button
      className="position-fixed justify-content-center align-items-center text-light border-0 rounded-circle cursor-pointer flow-button btn-bg-dark hover-bg-yellow"
      onClick={handleFlowClick}
      style={{ display: showButton ? "block" : "none" }}
    >
      <FontAwesomeIcon icon={faCircleChevronUp} />
    </button>
  );
};

export default ScrollToTopBtn;
