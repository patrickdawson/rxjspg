import { EventEmitter } from "events";
import { Observable, filter, shareReplay, tap } from "rxjs";

// Create an instance of EventEmitter
const eventEmitter = new EventEmitter();

// Create the main observable from EventEmitter
const sourceObservable = new Observable((subscriber) => {
  eventEmitter.on("available", (event) => {
    subscriber.next("available");
  });
  eventEmitter.on("changed", (event) => {
    subscriber.next("changed");
  });
  eventEmitter.on("unavailable", (event) => {
    subscriber.next("unavailable");
  });

  return () => {
    console.log("unsubscribe");
  };
}).pipe(
  shareReplay({ bufferSize: 1, refCount: true }), // Share the source
);

const filteredObservable = sourceObservable.pipe(
  filter((value) => value === "available" || value === "unavailable"),
  shareReplay({ bufferSize: 1, refCount: true }),
);

// Subscribe to the filteredObservable
const sub1 = filteredObservable.subscribe((event) => {
  console.log("sub1: ", event);
});

// Emit some events
eventEmitter.emit("unavailable");
eventEmitter.emit("available");
eventEmitter.emit("changed");
eventEmitter.emit("changed");
eventEmitter.emit("changed");

// Subscribe again after availability events have happened
setTimeout(() => {
  const sub2 = filteredObservable.subscribe((event) => {
    console.log("sub2: ", event);
  });
  sub1.unsubscribe();
  sub2.unsubscribe();
}, 500);
