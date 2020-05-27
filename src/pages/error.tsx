import React from "react";
import config from "../config";

const Error: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoImageContainer}>
        <img src="/images/logo.png" alt="logo" />
      </div>
      <div className={styles.contactContainer}>
        <div>URLが正しくありません。</div>
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
  logoImageContainer: "m-auto w-56 mt-6",
  contactContainer: "mt-20 mb-10 flex flex-col items-center",
  linkText: "text-teal-500",
};

export default Error;
