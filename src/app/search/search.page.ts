import { Component} from '@angular/core';
import { NavController, NavParams,LoadingController,ToastController,AlertController } from '@ionic/angular';
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
    public alertController: AlertController,
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
    this.presentAlert(kwds);

   // this.showToast(kwds);
    this.eventService.search(kwds).subscribe(async (body: any) => {
      if (body && body.events) {
        this.presentAlert(body.events);
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

  // async showToast(message){
  //   const toast = this.toastCtrl.create({
  //     message:  message,
  //     duration: 1500
  //   });
  //   (await toast).present();


  // }
  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Search',
      subHeader: 'Kyeword',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
