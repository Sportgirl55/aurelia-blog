import { AuthService } from "../common/services/auth-service";
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import { inject } from "aurelia-framework";

@inject(AuthService, Router, EventAggregator)
export class Login {

  constructor(AuthService, Router, EventAggregator) {
    this.authService = AuthService;
    this.router = Router;
    this.eventAggregator = EventAggregator;
  }

  activate() {
    this.error = null;
  }

  login() {
    this.error = null;
    this.authService.login(this.name).then(data => {
       this.eventAggregator.publish('user', data.name);
       this.router.navigateToRoute('home');
    })
    .catch(error => {
      this.error = error.message;
    })
  }


}
