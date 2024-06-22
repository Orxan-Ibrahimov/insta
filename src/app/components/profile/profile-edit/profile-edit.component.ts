import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  constructor() { }
  @Input('is_visible') visible :boolean;

  ngOnInit(): void {
  }

}
