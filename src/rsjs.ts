import { concatMap, interval, take } from 'rxjs';

const source = interval(1000);
const result = source.pipe(concatMap(val => interval(1000).pipe(take(2))));

result.subscribe(x => console.log(x));
