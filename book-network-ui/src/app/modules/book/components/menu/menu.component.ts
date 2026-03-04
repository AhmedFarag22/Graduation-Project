import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { KeycloakService } from '../../../../services/keycloak/keycloak.service';
import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';
import { ToastrService } from 'ngx-toastr';
import { Notification } from './notification';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-menu',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  socketClient: any = null;
  firstName: string = '';
  private notificationSubscription: any;
  unreadNotificationCount = 0;
  notifications: Array<Notification> = [];

  constructor(
    private keycloakService: KeycloakService,
    private toastrService: ToastrService,
    private router: Router
  )
     { }


  ngOnInit(): void {
    this.navigationHandler();

    if (this.keycloakService.keycloak.tokenParsed?.sub) {
      let ws = new SockJS('http://localhost:8088/api/v1/ws');
      this.socketClient = Stomp.over(ws);
      this.socketClient.connect(
        { Authorization: 'Bearer ' + this.keycloakService.keycloak.token }, () => {
          this.notificationSubscription = this.socketClient.subscribe(
          `/user/${this.keycloakService.keycloak.tokenParsed?.sub}/notifications`,
          (message: any) => {

            const notification: Notification = JSON.parse(message.body);
            if (notification) {
              this.notifications.unshift(notification);
              switch (notification.status) {
                case 'BORROWED':
                  this.toastrService.info(notification.message, notification.bookTitle);
                  break;
                case 'RETURNED':
                  this.toastrService.warning(notification.message, notification.bookTitle);
                  break;
                case 'RETURN_APPROVED':
                  this.toastrService.success(notification.message, notification.bookTitle);
                  break;
              }
              this.unreadNotificationCount++;
            }
          }
        )
        });

    }
  }

  private navigationHandler() {
    const profile = this.keycloakService.profile;
    if (profile) {
      this.firstName = profile.firstName || '';
    }

    const linkColor: NodeListOf<Element> =
      document.querySelectorAll('.nav-link');
    linkColor.forEach((link) => {
      if (window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
      }
      link.addEventListener('click', (): void => {
        linkColor.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }

  async logout() {
    this.keycloakService.logout();
  }
  //  logout() {
  //     localStorage.removeItem('token');
  //     window.location.reload();
  //   }

searchTitle: string = '';
searchCategory: string = '';


onSearch() {
  this.router.navigate(['/books'], {
    queryParams: {
      page: 0,
      size: 10,
      title: this.searchTitle?.trim() || null
    }
  });
}


}
