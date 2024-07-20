import { Component, OnInit } from '@angular/core';
import { GIF } from 'src/app/models/gif';
import { GIFService } from 'src/app/services/gif.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.scss'],
})
export class GifsComponent implements OnInit {
  constructor(
    private gifService: GIFService,
    private messageService: MessageService
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
    this.messageService.image$.subscribe((img) => {
      this.message_image = img;
    });
    this.gifService.get_searching_gifs('').subscribe((gifs) => {
      this.gifs = gifs;
    });
  }

  Okay(gif: GIF) {
    this.messageService.update_image(gif);
  }
}
