// assets
import welcomeImg from "../../../assets/dashboard/man-with-laptop-light.png";

// style
import style from "../../../pages/dashboard/dashboard.module.css";

const WelcomeCard = () => {
  return (
    <div className="bg-white rounded-3 pt-3 px-3 row m-0 mb-3">
      <div className="col-md-8 px-0 pe-md-3 pb-3 text-center text-md-start mb-md-0 mb-4">
        <h2 className={`h5 ${style["dash-purple"]} mb-3`}>
          Congratulations, Admin!&#127881;
        </h2>
        <p className="mb-0">
          You have done <span className="fw-semibold">72%</span> more sales
          today.
        </p>
        <p className="mb-4">Check your new badge in your profile.</p>
      </div>
      <div className="col-md-4 px-0 ps-md-1 align-self-md-end">
        <img src={welcomeImg} alt="" className={`img-fluid d-block mx-md-0 mx-auto ${style["dash-welcome-img"]}`} />
      </div>
    </div>
  );
};

export default WelcomeCard;
