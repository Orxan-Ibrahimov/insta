import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/models/postData';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss']
})
export class PostModalComponent implements OnInit {

  constructor() { }
  @Input() post_open: boolean;
  @Output() post_close = new EventEmitter<void>();

  showDialog(){
    this.post_open = true;
  }

  closePostModal(){
    this.post_open = false;
  }

  onModalClosed(){
    
  }

  // PostRefreshed() {
  //   this.postService.getPosts().subscribe((updated_posts) => {
  //     this.user.posts = updated_posts;
  //   });


  closeModal(event: Event) {
    this.post_open = false;
    this.post_close.emit();
  }
  ngOnInit(): void {
  }

}
