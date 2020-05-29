import { Observable, of } from "rxjs";
import { ajax, AjaxRequest, AjaxResponse } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";
import { SingletonRouter } from "next/router";
import config from "../../config";

const { baseUrl, coupon } = config.api.appServer;

export const sendLoginInfo = (
  email: string,
  password: string,
  params: string,
  Router: SingletonRouter
): Observable<AjaxRequest> => {
  return ajax({
    url: `${baseUrl}${coupon}?key=${params}`,
    method: "POST",
    body: { email, password },
  }).pipe(
    map((res: AjaxResponse) => {
      Router.push("/thanks");
    }),
    catchError((error) => {
      console.log(error);
      Router.push("/error");
      return of(error);
    })
  );
};
