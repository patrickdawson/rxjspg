import { Observable, shareReplay, filter, scan } from "rxjs";

const obs1 = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.next(2);
  subscriber.next(1);

  return () => {
    console.log("unsubscribe");
  };
}).pipe(
  shareReplay({
    bufferSize: 1,
    refCount: true,
  }),
);

const obs2 = obs1.pipe(
  filter((value) => value === 3),
  shareReplay({ bufferSize: 1, refCount: true }),
);

const sub1 = obs2.subscribe((value) => {
  console.log(`sub1: ${value}`);
});

const sub2 = obs2.subscribe((value) => {
  console.log(`sub2: ${value}`);
});

sub1.unsubscribe();
sub2.unsubscribe();
