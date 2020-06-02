import { Observable, of } from "rxjs";
import { ajax, AjaxRequest, AjaxResponse } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";
import { SingletonRouter } from "next/router";
import config from "../../configs";

const { baseUrl, coupon } = config.api.appServer;

export const sendLoginInfo = (
  email: string,
  password: string,
  key: string,
  Router: SingletonRouter
): Observable<AjaxRequest> => {
  return ajax({
    url: `${baseUrl}${coupon}`,
    method: "POST",
    body: { email, password, key },
  }).pipe(
    map((res: AjaxResponse) => {
      Router.push("/thanks");
    }),
    catchError((error) => {
      if (error.response.message === "クーポンが存在しません") {
        Router.push("/error");
      } else {
        alert(error.response.message);
      }
      console.log(error);
      return of(error);
    })
  );
};
