import {PostService} from "../common/services/post-service";
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Router, PostService, EventAggregator)
export class Edit {
  constructor(Router, PostService, EventAggregator) {
    this.router = Router;
    this.postService = PostService;
    this.eventAggregator = EventAggregator;
  }

  activate(params) {
    this.postService.find(params.slug).then(data => {
      this.post = data.post;
    }).catch(error => console.log(error))

    this.title = "Edit post"
  }
 
  editPost() {
    this.postService.update(this.post).then(data => {
       this.eventAggregator.publish('post-updated', Date())
       this.router.navigateToRoute('post-view', {slug: data.slug})
    }).catch(error => {
       console.log(error)
    })
  }
}
