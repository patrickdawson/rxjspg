import { Observable } from 'rxjs';

const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);

  return () => {
    console.log('unsubscribe first observable');
  }
});

const sub1 = observable.subscribe(value => console.log(value));

setTimeout(() => {
  sub1.unsubscribe();
}, 1000);
