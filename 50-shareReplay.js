import {Observable, shareReplay} from 'rxjs';

const obs1 = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);

  return () => {
    console.log('unsubscribe');
  }
}).pipe(shareReplay({
  bufferSize: 1,
  refCount: true,
}));

const sub1 = obs1.subscribe(value => {
  console.log(`sub1: ${value}`);
});
const sub2 = obs1.subscribe(value => {
  console.log(`sub2: ${value}`);
});

sub1.unsubscribe();
sub2.unsubscribe();
