import styles from "./page404.module.css";

const Page404 = () => {
  return (
    <div id="page404" className={`${styles.Page404}`}>
      
        <div className="text-center">
          <h1 className={`${styles["text-9xl"]} ${styles["font-bold"]}`}>404</h1>
          <h1 className="fw-bolder">Page Not Found</h1>
          <p>we couldn't find what you were looking for.</p>
          <p>
            Please contact the owner of the site that linked you to the original
            URl and let them know their link is broken.
          </p>
        </div>
      
    </div>
  );
};

export default Page404;
