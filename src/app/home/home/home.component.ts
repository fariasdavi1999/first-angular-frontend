import { PushNotificationService } from 'ng-push-notification';
import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private pushNotification: PushNotificationService) {}

  ngOnInit(): void {
    navigator.serviceWorker.ready.then((res) => {
      res.getNotifications().then((res) => {
        window.open('https://primeiro-frontend-angular.vercel.app');
      });
    });
  }

  //através de service worker, no inspecionar falou pra usar service worker pra notificar no celular
  notificar() {
    Notification.requestPermission((result) => {
      if (result === 'granted') {
        navigator.serviceWorker.ready.then((reg) => {
          reg.showNotification('NOVA NOTIFICAÇÃO', {
            icon: 'assets/icons/icon-96x96.png',
            body: 'Corpo da mensagem',
            lang: 'pt-BR',
            // dir: 'auto',
            timestamp: Date.now(),
            vibrate: [100, 50, 100],
            actions: [
              {
                icon: '/assets/icons/icon-72x72.png',
                action: 'https://primeiro-frontend-angular.vercel.app',
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
