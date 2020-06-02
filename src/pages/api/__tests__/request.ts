import { from } from "rxjs";

test("the observable interval emits 100 then 200 then 300", (done) => {
  let last = 100;
  from([100, 200, 300]).subscribe({
    next: (val) => {
      expect(val).toBe(last);
      last += 100;
    },
    complete: () => done(),
  });
});
