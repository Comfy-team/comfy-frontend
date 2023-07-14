import styles from "../../pages/about/about.module.css";

export default function WhatTell() {
  return (
    <div className={`${styles.thecontent} container`}>
      <h1 className={`pt-5`}> what they're saying</h1>
      <p className={`pb-3 pt-5`}>
        "I recently purchased a sectional sofa from Comfy, and I couldn't be
        happier with my experience. The process of ordering online was so easy
        and stress-free, and the customer service team was incredibly helpful
        when I had some questions about delivery. When the sofa arrived, I was
        blown away by how comfortable it was. The cushions were so plush and
        cozy, and the fabric was soft to the touch. It's now become my favorite
        spot to relax and unwind at the end of the day. I highly recommend Comfy
        to anyone looking for stylish and comfortable furniture"
      </p>
      <h5>Mohamad Ali</h5>
      <div>
        <h6 className="mb-4">Analyst</h6>
      </div>
    </div>
  );
}
