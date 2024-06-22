import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/postData';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss']
})
export class PostModalComponent implements OnInit {

  constructor() { }
  @Input() post_visible: boolean;
  showDialog(){
    this.post_visible = true;
  }

  closePostModal(){
    this.post_visible = false;
  }
  ngOnInit(): void {
  }

}
