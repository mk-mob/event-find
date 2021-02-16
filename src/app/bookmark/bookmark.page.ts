import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from '@ionic/angular';
import { BookmarkService } from '../bookmark.service';
import { Router } from '@angular/router';

@Component({
  selector: 'page-bookmark',
  templateUrl: 'bookmark.html',
})
export class BookmarkPage {

  events: any[] = [];

  constructor(
    public router: Router,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public bookmarkService: BookmarkService
){}

  ionViewWillEnter() {
    console.log('ionViewWillEnter BookmarkPage');
    this.bookmarkService.get().then(events => {
      this.events = this.toEventArray(events);
    });
  }

  private toEventArray(events): Array<any> {
    const eventArray = [];
    Object.keys(events).forEach(key => {
      eventArray.push(events[key]);
    })
    eventArray.sort((ev1, ev2) => {
      let ret = ev2.started_at.localeCompare(ev1.started_at);
      if (ret !== 0) return ret;
      return ev2.event_id - ev1.event_id;
    })
    return eventArray;
  }

  openEvent(event) {
    this.router.navigate(['EventDetailPage', {
      eventId: event.event_id,
      event: event
    }]);
  }

  doDelete(event:any) {
    this.bookmarkService.delete(event).then(async events => {
      this.events = this.toEventArray(events);
      const toast = this.toastCtrl.create({
        message: 'ブックマークを削除しました。',
        duration: 1500
      });
      (await toast).present();
    })
   
  }
}