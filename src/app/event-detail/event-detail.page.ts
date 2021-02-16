import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from '@ionic/angular';
import {EventService} from '../event.service';
import { BookmarkService } from '../bookmark.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage {

  event: any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public eventService: EventService,
     public toastCtrl: ToastController,
     public bookmarkService: BookmarkService
     ) {
  }


  

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
    this.event = this.navParams.data.event;
    if (!this.event) {
      this.eventService.get(this.navParams.data.eventId).subscribe((body: any) => {
        if (body && body.events && body.events.length > 0) this.event = body.events[0];
      });
  }
}
  doBookmark() {
    this.bookmarkService.put(this.event).then(async () => {
      const toast = this.toastCtrl.create({
        message: 'イベントをブックマークしました。',
        duration: 1500
      });
      (await toast).present();
    })
  }
  
}
