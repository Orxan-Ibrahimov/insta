import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-followers-card',
  templateUrl: './followers-card.component.html',
  styleUrls: ['./followers-card.component.scss'],
})
export class FollowersCardComponent implements OnInit {
  followers = [
    { name: 'Andrew Thomas', username: 'AndrewThomas', image: 'img1.png' },
    { name: 'Hulk Buster', username: 'HulkBuster', image: 'img2.png' },
    { name: 'Thor', username: 'Thunder Master', image: 'img3.png' },
    { name: 'Natasha', username: 'Natasha', image: 'img4.jpg' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
