import React, { useState } from "react";
import config from "../configs";

const Thanks: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.thanksImageContainer}>
        <img src="/images/cover_thanks.png" alt="thanks" />
      </div>
      <div className={styles.downloadImage}>
        <a href={config.url.download}>
          <img src="/images/bt-download.png" alt="download" />
        </a>
      </div>
      <div className={styles.contactContainer}>
        <div>
          お困りの際は{" "}
          <span>
            <a href={config.url.contact} className={styles.linkText}>
              お客様サポート
            </a>
          </span>
          へご連絡ください。
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: "flex flex-col",
  thanksImageContainer: "sm:w-120 flex flex-col m-auto",
  downloadImage: "m-auto w-3/4 sm:w-96",
  contactContainer: "mt-6 mb-10 flex flex-col items-center",
  linkText: "text-teal-500",
};

export default Thanks;
