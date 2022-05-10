import { PLATFORM, inject } from "aurelia-framework";
import { PostService } from "./common/services/post-service";


@inject(PostService)
export class App {
  constructor(PostService) {
    this.postService = PostService;
  }

  attached() {
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
      {
        route: ["archive/:archive"],
        name: "archive-view",
        moduleId: PLATFORM.moduleName("posts/archive-view"),
        title: "View posts by Archive",
      },
      {
        route: ["tag/:tag"],
        name: "tag-view",
        moduleId: PLATFORM.moduleName("posts/tag-view"),
        title: "View posts by Tag",
      },
    ]);

   // config.mapUnknownRoutes("posts/not-found.html");
    this.router = router;
  }

}
