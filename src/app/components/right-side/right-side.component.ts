import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-side',
  templateUrl: './right-side.component.html',
  styleUrls: ['./right-side.component.scss']
})
export class RightSideComponent implements OnInit {

  constructor() { }
  visible:boolean = false;
  showPostModal(){
    this.visible = true;
  }

  onModalClosed(){
    this.visible = false;
  }
  ngOnInit(): void {
  }

}
