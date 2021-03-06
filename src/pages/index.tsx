import React, { useState, useEffect } from "react";
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import clickLoginEvent from "../streams/click";
import { ParsedUrlQuery } from "querystring";
import { inValidEmail, inValidPassword } from "../utils";
import axios from "axios";
import Router from "next/router";
import ScaleLoader from "react-spinners/ScaleLoader";
import config from "../configs";

interface Props {
  query: ParsedUrlQuery;
  errors?: string;
}

const { baseUrl, coupon } = config.api.appServer;
const { contact, privacyPolicy, termsOfService } = config.url;

const Home: NextPage<Props> = ({ query, errors }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const key = query.key as string;

  const clickSubject$ = clickLoginEvent(email, password, key, Router);

  const onClickStartButton = () => {
    setLoading(true);
    startClickEvent();
  };

  const startClickEvent = () => {
    clickSubject$.next(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className={isLoading ? styles.loadingView : ""}>
      <div className={styles.homeImage}>
        <img src="/images/iqos_home.jpg" alt="icos_home" />
      </div>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <div className={styles.flexRowContainer}>
            <label className={styles.label} htmlFor="email">
              メールアドレス
            </label>
          </div>
          <input
            className={styles.textFieldInput}
            type="text"
            placeholder="メールアドレスを入力"
            onChange={onChangeEmail}
            data-cy="email"
          />
          <div
            className={
              email && inValidEmail(email)
                ? styles.warningText
                : styles.blankText
            }
            data-cy="warningEmail"
          >
            ※入力が正しくありません
          </div>
        </div>

        <div className={styles.inputContainer}>
          <div className={styles.flexRowContainer}>
            <label className={styles.label} htmlFor="password">
              パスワード
            </label>
          </div>

          <input
            className={styles.textFieldInput}
            type="text"
            placeholder="6桁以上のパスワードを入力"
            onChange={onChangePassword}
            data-cy="password"
          />
          <div
            className={
              password && inValidPassword(password)
                ? styles.warningText
                : styles.blankText
            }
            data-cy="warningPassword"
          >
            ※半角6文字以上で入力してください
          </div>
        </div>

        {isLoading && (
          <div className={styles.loadingContainer}>
            <ScaleLoader
              height={50}
              width={7}
              color={"#319795"}
              loading={isLoading}
            />
          </div>
        )}

        <div className={styles.startButtonContainer}>
          <button
            onClick={onClickStartButton}
            disabled={inValidEmail(email) || inValidPassword(password)}
            data-cy="startButton"
          >
            <img
              className={
                inValidEmail(email) || inValidPassword(password)
                  ? styles.disabledStartButtonImage
                  : styles.startButtonImage
              }
              src="/images/bt-start.png"
              alt="start-button"
            />
          </button>
        </div>

        <div className={styles.policyContainer}>
          <div className={styles.smallText}>
            ご登録することで
            <span>
              <a href={privacyPolicy} className={styles.linkText}>
                プライバシーポリシー
              </a>
            </span>
            と
          </div>
          <div className={styles.smallText}>
            {" "}
            <span>
              <a href={termsOfService} className={styles.linkText}>
                利用規約
              </a>
            </span>
            に同意します。
          </div>
        </div>

        <div className={styles.contactContainer}>
          <div className={styles.smallText}>
            登録の過程で不具合等がございましたら、
          </div>
          <div className={styles.smallText}>
            お手数ですが{" "}
            <span>
              <a href={contact} className={styles.linkText}>
                お客様サポート
              </a>
            </span>
            まで
          </div>
          <div className={styles.smallText}>ご連絡ください。</div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const query = context.query;
    const response = context.res;
    const params = query?.key ? `?key=${query.key}` : "";
    const url = `${baseUrl}${coupon}${params}`;
    const result = await axios.get(url);

    if (!Object.keys(query).length) {
      response.writeHead(302, { Location: "/error" });
      response.end();
    }

    return {
      props: { query },
    };
  } catch (e) {
    const response = context.res;
    response.writeHead(302, { Location: "/error" });
    response.end();

    return {
      props: {
        errors: e.message,
      },
    };
  }
};

const styles = {
  container: "flex flex-col m-auto max-w-screen-sm px-6 md:px-12",
  loadingView: "opacity-25 flex-1 h-full w-full",
  loadingContainer: "self-center absolute top-23",
  loading: "self-center",
  flexRowContainer: "flex flex-row",
  homeImage: "mb-5 m-auto max-w-screen-sm ",
  label: "font-bold text-lg block mb-2 mr-4",
  inputContainer: "py-3",
  textFieldInput:
    "bg-white w-full block focus:outline-none focus:shadow-outline leading-normal appearance-none border border-gray-300 rounded-lg py-2 mb-2 px-4",
  startButtonContainer: "mt-4 m-auto",
  startButtonImage: "sm: w-84 md:w-96",
  disabledStartButtonImage: "opacity-25 sm: w-84 md:w-96",
  policyContainer: "flex flex-col flex-no-wrap items-center mt-6",
  contactContainer: "flex flex-col items-center mt-10 mb-10",
  warningText: "text-red-500",
  blankText: "text-transparent",
  linkText: "text-teal-500 ",
  smallText: "text-sm",
};

export default Home;
