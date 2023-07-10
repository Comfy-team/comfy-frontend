import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// component
import Login from "./login";
import Register from "./register";
import { showLoginModal } from "../../store/slices/loginModalSlice";

// style
import styles from "./login-register.module.css";


const Modal = () => {
  
  const [activeTab, setActiveTab] = useState("login");
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(showLoginModal(false))
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleCreateAccountClick = () => {
    setActiveTab("register");
  };
  const handleRegistrationSuccess = () => {
    setActiveTab("login");
  };

  // *** decode token and save user data***
  function saveUserData() {
    // Get the JWT token from local storage
    let encodedToken = localStorage.getItem("userToken");
    // Decode the token
    let decodedToken = jwtDecode(encodedToken);
    // Set the decoded user data in the state
    setUserData(decodedToken);
  }

  useEffect(() => {
    document.body.classList.add(styles["modal-open"]);

    return () => {
      document.body.classList.remove(styles["modal-open"]);
    };
  }, []);

  return (
    <>
      <div
        className={`modal fade show d-block ${styles.modal} ${styles.appear}`}
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content container">
            <div className="modal-header row border-0">
              <div className="d-flex align-items-end justify-content-end">
                <FontAwesomeIcon
                  icon={faXmark}
                  style={{ fontSize: "24px" }}
                  className={styles.cancel}
                  onClick={closeModal}
                />
              </div>
              <div className="d-flex ">
                <h6
                  className={`col-6 text-center 
                    ${
                      activeTab === "login"
                        ? `${styles.title} ${styles.active}`
                        : styles.title
                    }`}
                  onClick={() => handleTabClick("login")}
                >
                  Login
                </h6>
                <h6
                  className={`col-6 text-center 
                    ${
                      activeTab === "register"
                        ? `${styles.title} ${styles.active}`
                        : styles.title
                    }`}
                  onClick={() => handleTabClick("register")}
                >
                  Register
                </h6>
              </div>
            </div>

            <div className="modal-body">
              {activeTab === "login" ? (
                <Login closeModal={closeModal} saveUserData={saveUserData} />
              ) : (
                <Register onRegistrationSuccess={handleRegistrationSuccess} />
              )}

              {activeTab === "login" ? (
                <>
                  <p className={styles.or}>
                    <span className={styles.line}></span>
                    <span>or</span>
                    <span className={styles.line}></span>
                  </p>
                  <div
                    className={`${styles["group-button"]} ${styles["button-navigate"]}`}
                  >
                    <input
                      type="button"
                      className={`btn-bg-gray ${styles.button} ${styles.register}`}
                      value="Create New Account"
                      onClick={handleCreateAccountClick}
                    />
                  </div>
                </>
              ) : null}
              {activeTab === "register" ? (
                <>
                  <p className={styles.or}>
                    <span className={styles.line}></span>
                    <span>or</span>
                    <span className={styles.line}></span>
                  </p>
                  <div
                    className={`${styles["group-button"]} ${styles["button-navigate"]}`}
                  >
                    <input
                      type="button"
                      className={`btn-bg-gray ${styles.button} ${styles.register}`}
                      value="Login"
                      onClick={() => handleTabClick("login")}
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
