import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  notificar(title: string) {
    Notification.requestPermission();
    new Notification(title, {
      icon: 'https://miro.medium.com/max/1400/1*R1mfXLP9edcArZXwmGbGag.jpeg',
      body: 'Corpo da mensagem de teste',
      // actions: [
      //   {
      //     action: 'http://localhost:4200/',
      //     title: 'Abrir',
      //     icon: 'https://miro.medium.com/max/1400/1*R1mfXLP9edcArZXwmGbGag.jpeg',
      //   },
      // ],
      lang: 'pt-BR',
      dir: 'auto',
      timestamp: Date.now(),
      vibrate: [100, 50, 100],
    });
  }
}
