import {bindable} from 'aurelia-framework';
import {PostService} from "../../common/services/post-service";
import {inject} from 'aurelia-framework';
import {ValidationRules, ValidationControllerFactory} from 'aurelia-validation';


@inject(ValidationControllerFactory, PostService)
export class PostForm {
  @bindable post;
  @bindable title;

  constructor(ValidationControllerFactory, PostService) {
    this.controller = ValidationControllerFactory.createForCurrentScope();
    this.postService = PostService;
  }

  attached() {
    this.postService.allTags().then(data => {
      this.allTags = data.tags;
    }).catch(error => {
      console.log(error)
    })
  }

  addTag() {
    if(this.newTag) {
      this.allTags.push(this.newTag);
      this.post.tags.push(this.newTag);
    }
    this.newTag = '';
  }

  submit() {

  }

  postChanged(newValue, oldValue) {
    if(this.post) {
      ValidationRules
        .ensure('title')
        .required()
        .on(this.post);
    }
  }
}
