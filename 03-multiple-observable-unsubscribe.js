import { Observable, delay, shareReplay } from 'rxjs';

function demoColdObservable() {
  const obs1 = new Observable(subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);

    return () => {
      console.log('unsubscribe first observable');
    }
  });

  const obs2 = obs1.pipe(delay(500));

  const sub1 = obs1.subscribe(value => console.log(value));
  const sub2 = obs2.subscribe(value => console.log(value));

  setTimeout(() => {
    sub1.unsubscribe();
    sub2.unsubscribe();
  }, 1000);
}

function demoHotObservable() {
  const obs1 = new Observable(subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);

    return () => {
      console.log('unsubscribe first observable');
    }
  }).pipe(shareReplay({
    bufferSize: 3,
    refCount: true,
  }));

  const obs2 = obs1.pipe(delay(500));

  const sub1 = obs1.subscribe(value => console.log(value));
  const sub2 = obs2.subscribe(value => console.log(value));

  setTimeout(() => {
    sub1.unsubscribe();
    sub2.unsubscribe();
  }, 1000);
}

// demoColdObservable();
demoHotObservable();


