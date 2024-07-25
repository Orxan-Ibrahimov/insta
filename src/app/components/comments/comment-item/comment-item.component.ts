import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {
  @Input() post_comment: Comment;

  constructor() {}

  comment_date_parse: string;
  date_detail: string;
  i_must_reply: boolean = false;

  ngOnInit(): void {
    this.comment_date_parse = this.Parse_MessageDate(this.post_comment.date);
    this.date_detail = this.formatDateTime(new Date(this.post_comment.date));
  }

  MakeReply() {
    this.i_must_reply = !this.i_must_reply;
  }

  formatDateTime(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };

    const timeString = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const dateString = date.toLocaleDateString('en-GB', options);

    return `${timeString}, ${dateString}, ${date.toLocaleDateString('default', {
      weekday: 'long',
    })}`;
  }

  Parse_MessageDate(date: Date) {
    let result;
    let diff: number = Math.abs(Date.now() - new Date(date).getTime());

    let comment_year = new Date(date).getFullYear();
    let month_duration = new Date(
      new Date(date).getFullYear(),
      new Date(date).getMonth(),
      0
    ).getDate();
    let year_duration =
      (comment_year % 4 === 0 && comment_year % 100 !== 0) ||
      comment_year % 400 === 0
        ? 366
        : 365;

    let minutes = Math.ceil(diff / (1000 * 60));
    let hours = Math.ceil(diff / (1000 * 60 * 60));
    let days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    let weeks = Math.ceil(diff / (1000 * 60 * 60 * 24 * 7));
    let months = Math.ceil(diff / (1000 * 60 * 60 * 24 * month_duration));
    let years = Math.ceil(diff / (1000 * 60 * 60 * 24 * year_duration));

    if (minutes === 1) result = 'now';
    else if (hours === 1) result = `${minutes} minutes`;
    else if (days === 1) result = `${hours} hours`;
    else if (weeks === 1) result = `${days} days`;
    else if (months === 1) result = `${weeks} weeks`;
    else if (years === 1) result = `${months} months`;
    else if (years > 1) result = `${years} years`;

    return result;
  }
}
