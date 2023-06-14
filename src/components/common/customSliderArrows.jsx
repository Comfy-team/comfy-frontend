export const RightArrow = ({ onClick, ...rest }) => {
  return (
    <button
      className="btn slider-btn text-white react-multiple-carousel__arrow react-multiple-carousel__arrow--right"
      onClick={() => onClick()}
    ></button>
  );
};

export const LeftArrow = ({ onClick, ...rest }) => {
  return (
    <button
      className="btn slider-btn text-white react-multiple-carousel__arrow react-multiple-carousel__arrow--left"
      onClick={() => onClick()}
    ></button>
  );
};
