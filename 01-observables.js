import { Observable } from 'rxjs';

const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();

  return () => {
    console.log('unsubscribe');
  }
});

observable.subscribe(value => console.log(value));
