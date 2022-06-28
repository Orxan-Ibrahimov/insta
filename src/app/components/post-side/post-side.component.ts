import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/postData';

@Component({
  selector: 'app-post-side',
  templateUrl: './post-side.component.html',
  styleUrls: ['./post-side.component.scss']
})
export class PostSideComponent implements OnInit {

  constructor() { }

  Posts:Post[] = [
    {id: 1, name: "Tzuyu", likes: 2300, liked:true, desc: "Happy New Year All friends! #2023", image:"postpic1.jpg" },
    {id: 2, name: "Maryam", likes: 2300, liked:false, desc: "Party time :)", image:"postpic2.jpg" },
    {id: 3, name: "Selena Gomez", likes: 800, liked:false, desc: "At Archery Festival", image:"postpic3.JPG" },
  ]
  ngOnInit(): void {
  }

}
