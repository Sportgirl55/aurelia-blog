import { PLATFORM, inject } from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import { PostService } from "./common/services/post-service";
import { AuthService } from "./common/services/auth-service";

@inject(PostService, AuthService, EventAggregator)
export class App {
  constructor(PostService, AuthService, EventAggregator) {
    this.postService = PostService;
    this.authService = AuthService;
    this.eventAggregator = EventAggregator;
  }

  attached() {
    this.currentUser = this.authService.currentUser;
    this.subscription = this.eventAggregator.subscribe('user', user => {
      this.currentUser = this.authService.currentUser;
    });

    this.updateSidebar();
    this.postSubscription = this.eventAggregator.subscribe('post-updated', updateAt => {
      this.updateSidebar()
    })
  }

  updateSidebar() {
    this.postService.allTags()
    .then(data => this.tags = data.tags)
    .catch(error => this.error = error.message)
  this.postService.allArchives()
    .then(data => this.archives = data.archives)
    .catch(error => this.error = error.message)
  }

  configureRouter(config, router) {
    config.options.pushState = true;
    config.options.root = '/';
    config.title = "Nick\'s Blog";
    config.map([
      {
        route: [""],
        name: "home",
        moduleId: PLATFORM.moduleName("posts/index"),
        nav: true,
        title: "All Posts"
      },
      {
        route: "login",
        name: "login",
        moduleId: PLATFORM.moduleName("auth/login"),
        title: "Login"
      },
      {
        route: "signup",
        name: "signup",
        moduleId: PLATFORM.moduleName("auth/signup"),
        title: "Sign Up"
      },
      {
        route: ["create-post"],
        name: "create-post",
        moduleId: PLATFORM.moduleName("posts/create"),
        title: "Create post"
      },
      {
        route: ["post/:slug"],
        name: "post-view",
        moduleId: PLATFORM.moduleName("posts/view"),
        title: "View post"
      },
      {
        route: ["post/:slug/edit"],
        name: "post-edit",
        moduleId: PLATFORM.moduleName("posts/edit"),
        title: "Edit post"
      },
      {
        route: ["archive/:archive"],
        name: "archive-view",
        moduleId: PLATFORM.moduleName("posts/archive-view"),
        title: "View posts by Archive"
      },
      {
        route: ["tag/:tag"],
        name: "tag-view",
        moduleId: PLATFORM.moduleName("posts/tag-view"),
        title: "View posts by Tag"
      },
    ]);

   // config.mapUnknownRoutes("posts/not-found.html");
    this.router = router;
  }

  detached() {
    this.subscription.dispose();
    this.postSubscription.dispose();
  }

  logout() {
    this.authService.logout().then(data => {
      console.log(data.success)
      this.eventAggregator.publish('user', null);
    }).catch(error => {
      this.error = error.message;
    })
  }

}
