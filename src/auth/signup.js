import { inject } from "aurelia-framework";
import { AuthService } from "../common/services/auth-service";
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';

@inject(AuthService, Router, EventAggregator)
export class Signup {
  constructor(AuthService, Router, EventAggregator) {
    this.authService = AuthService;
    this.router = Router;
    this.ea = EventAggregator;
    this.error = null;
  }

  signup() {
    this.error = null;
    this.authService.signup(this.name)
      .then(data => {
        this.ea.publish('user', data.name);
        this.router.navigateToRoute('home');
      }).catch(error => {
        this.error = error.message
      })
  }
}
