import { PLATFORM } from "aurelia-framework";

export class App {

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
        title: "All Posts",
      },
      // {
      //   route: "about",
      //   name: "about",
      //   moduleId: PLATFORM.moduleName("about"),
      //   title: "About",
      // },
      {
        route: ["post/:slug"],
        name: "post-view",
        moduleId: PLATFORM.moduleName("posts/view"),
        title: "View post",
      },
    ]);

    config.mapUnknownRoutes("posts/not-found.html");
    this.router = router;
  }

}
