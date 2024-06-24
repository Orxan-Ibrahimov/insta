import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-edit-modal',
  templateUrl: './profile-edit-modal.component.html',
  styleUrls: ['./profile-edit-modal.component.scss']
})
export class ProfileEditModalComponent implements OnInit {

  constructor() { }
  @Input('is_visible') visible :boolean;

  ngOnInit(): void {
  }

}
