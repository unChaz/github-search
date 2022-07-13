import { ParamMap } from "@angular/router";
import { Observable, of } from "rxjs";

export class ActivatedRouteMock {
  snapshot = { params: {} };
  data = of({});
  firstChild = undefined;
  paramMap: Observable<ParamMap>;
}
