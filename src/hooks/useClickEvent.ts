import { Subject } from "rxjs";
import { exhaustMap, throttleTime } from "rxjs/operators";
import { sendLoginInfo } from "../pages/api/request";
import { SingletonRouter } from "next/router";

const useClickLoginEvent = (
  email: string,
  password: string,
  params: string,
  Router: SingletonRouter
) => {
  const clickSubject$ = new Subject<boolean>();
  const click$ = clickSubject$
    .pipe(
      throttleTime(5000), // prevent double click
      exhaustMap(() => sendLoginInfo(email, password, params as string, Router))
    )
    .subscribe();

  return { clickSubject$, click$ };
};

export default useClickLoginEvent;
