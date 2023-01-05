import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from 'ng-push-notification';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private pushNotification: PushNotificationService,
    private swPush: SwPush,

    private router: Router
  ) {}

  ngOnInit(): void {
    //quando a notificacao chegar permite abrir a janela com uma ação
    this.swPush.notificationClicks.subscribe(({ notification }) => {
      window.open(notification.data, '_blank');
    });
  }

  //através de service worker, no inspecionar(f12) falou pra usar service worker pra notificar no celular(android)
  async notificar() {
    await Notification.requestPermission((result) => {
      if (result === 'granted') {
        navigator.serviceWorker.ready.then((reg) => {
          reg.showNotification('NOVA NOTIFICAÇÃO', {
            icon: 'assets/icons/icon-96x96.png',
            body: 'Corpo da mensagem',
            lang: 'pt-BR',
            // dir: 'auto',
            timestamp: Date.now(),
            vibrate: [100, 50, 100],
            data: 'https://primeiro-frontend-angular.vercel.app',
            requireInteraction: true,
            actions: [
              {
                icon: '',
                action: 'explore',
                title: 'Abrir',
              },
            ],
          });
        });
      }
    });
  }

  // notifacao via ng-push-notification
  // notificar() {
  //   this.pushNotification.requestPermission().then((res) => {
  //     console.log(`Notificações: ${res} `);
  //   });
  //   this.pushNotification.show(
  //     'TITULO DA MENSAGEM',
  //     {
  //       body: 'Corpo da mensagem ng-push-botification',
  //       icon: 'src/assets/icons/icon-96x96.png',
  //       silent: false,
  //       vibrate: [100, 50, 100],
  //       lang: 'pt-BR',
  //     },
  //     5000
  //   );
  // }

  // notificacao apenas para desktop a principio via blibioteca interna
  // notificar(title: string) {
  //   Notification.requestPermission();
  //   new Notification(title, {
  //     icon: 'https://miro.medium.com/max/1400/1*R1mfXLP9edcArZXwmGbGag.jpeg',
  //     body: 'Corpo da mensagem de teste',
  //     // actions: [
  //     //   {
  //     //     action: 'http://localhost:4200/',
  //     //     title: 'Abrir',
  //     //     icon: 'https://miro.medium.com/max/1400/1*R1mfXLP9edcArZXwmGbGag.jpeg',
  //     //   },
  //     // ],
  //     lang: 'pt-BR',
  //     // dir: 'auto',
  //     timestamp: Date.now(),
  //     vibrate: [100, 50, 100],
  //   });
  // }
}
