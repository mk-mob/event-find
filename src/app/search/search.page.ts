import { Component} from '@angular/core';
import { NavController, NavParams,LoadingController } from '@ionic/angular';
import { EventService} from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {

  keywords:string ="";
  events: any[] =[];

  constructor(
    public router:Router,
    //public navParams: NavParams,
     public loadingCtrl: LoadingController,
     public eventService: EventService,
    ) { }


    ionViewDidLoad() {
      console.log('ionViewDidLoad SearchPage');
    }
  

  async getEvents(ev){
    const searchKeywords:string = this.keywords.trim();
    if (!searchKeywords) return;
    const loading = this.loadingCtrl.create({
       
      message: "Please wait...",
      duration: 200
    });
      (await loading).present();
    
    const kwds = searchKeywords.split(' ').filter(v => v !== "");
    this.eventService.search(kwds).subscribe(async (body: any) => {
      if (body && body.events) {
        if (this.keywords === searchKeywords) {
          this.events = body.events;
        }
      }
       (await loading).onDidDismiss();
    }, async (error: any) => {
      (await loading).onDidDismiss();
    })
  }
  openEvent(event) {
    this.router.navigate(['EventDetailPage:', {
      eventId: event.event_id,
      event: event
    }]);
  }
}
