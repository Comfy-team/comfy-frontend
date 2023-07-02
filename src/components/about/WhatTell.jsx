import React from "react";
import styles from "../../pages/about/about.module.css";

export default function WhatTell() {
  return (
    <div>
      <div className={`${styles.thecontent} container row`}>
        <h1 className={`pt-5 `}> what they're saying</h1>
        <p className={`pb-3 pt-5`}>
          " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a
          aliquet libero. Sed id sodales massa. Nullam vel sapien ac enim
          lacinia fermentum. Fusce accumsan ultricies velit, eu fermentum sem
          vehicula a. Donec vel nulla vitae ipsum sodales molestie. Curabitur
          aliquet justo et est vehicula, id eleifend eros aliquet. Praesent "
        </p>
        <h5> mohamad ali</h5>
        <div>
          <h6 className=" mb-5 pb-5"> analyst</h6>
        </div>
      </div>
    </div>
  );
}
