import {PostService} from "../common/services/post-service";
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Router, PostService, EventAggregator)
export class Create {
  constructor(Router, PostService, EventAggregator) {
    this.router = Router;
    this.postService = PostService;
    this.eventAggregator = EventAggregator;
  }

  attached() {
    this.post = {
      title: '',
      body: '',
      tags: []
    };
    this.title = "Create post"
  }
 
  createPost() {
    this.postService.create(this.post).then(data => {
       this.eventAggregator.publish('post-updated', Date())
       this.router.navigateToRoute('post-view', {slug: data.slug})
    }).catch(error => {
       console.log(error)
    })
  }
}
