import { Component, OnInit } from '@angular/core';
import { GIF } from 'src/app/models/gif';
import { CommentService } from 'src/app/services/comment.service';
import { GIFService } from 'src/app/services/gif.service';

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.scss'],
})
export class GifsComponent implements OnInit {
  constructor(
    private gifService: GIFService,
    private commentService: CommentService
  ) {}
  gifs: GIF[];
  message_image: any;
  search: string;

  onSearch() {
    this.gifService
      .get_searching_gifs(this.search)
      .subscribe((searching_gifs) => {
        this.gifs = searching_gifs;
      });
  }
  ngOnInit(): void {
    this.commentService.image$.subscribe((img) => {
      this.message_image = img;
    });
    this.gifService.get_searching_gifs('').subscribe((gifs) => {
      this.gifs = gifs;
    });
  }

  Okay(gif: GIF) {
    this.commentService.update_image(gif);
  }
}
