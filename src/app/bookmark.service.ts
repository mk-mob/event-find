import { Component} from '@angular/core';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class BookmarkService {

  constructor(public storage: Storage) {}

  get() {
    return this.storage.get("bookmark.events").then(events => {
      return events ? events : {};
    });
  }
  put(event: any) {
    return this.get().then(events => {
      events[event.event_id] = event;
      return this.storage.set("bookmark.events", events);
    })
  }
  delete(event: any) {
    return this.get().then(events => {
      delete events[event.event_id];
      return this.storage.set("bookmark.events", events);
    })
  }
}

