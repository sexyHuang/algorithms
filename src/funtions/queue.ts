import { from, mergeMap } from 'rxjs';

function queue(promiseList: Promise<any>[], queueLength = 5) {
  return from(promiseList).pipe(
    mergeMap(observable => observable, queueLength)
  );
}
