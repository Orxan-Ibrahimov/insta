import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { CommentLike } from 'src/app/models/comment_like';
import { Emotion } from 'src/app/models/emotion';
import { Like } from 'src/app/models/like';
import { User } from 'src/app/models/user';
import { CommentService } from 'src/app/services/comment.service';
import { CommentLikeService } from 'src/app/services/comment_like.service';
import { EmotionService } from 'src/app/services/emotion.service';
import { LikeService } from 'src/app/services/like.service';
import { LocaleStorageService } from 'src/app/services/locale-storage.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {
  @Input() post_comment: Comment;
  is_me: boolean = false;
  active_actions: boolean = false;
  emotions: Emotion[];
  emotion: Emotion;
  default: Emotion;
  comment_like: CommentLike;
  liked: boolean = false;
  me: User;


  constructor(
    private localeStorageService: LocaleStorageService,
    private commentService: CommentService,
    private postService: PostService,
    private commentLikeService: CommentLikeService,
    private emotion_service: EmotionService,

  ) {}

  comment_date_parse: string;
  date_detail: string;
  i_must_reply: boolean = false;

  ngOnInit(): void {
    this.emotion_service.current_emotion$.subscribe((data) => {
      this.default = data;
    });

    this.localeStorageService.me$.subscribe((me) => {
      if (this.post_comment.user.id === me.id) this.is_me = true;
      this.me = me;
      this.commentLikeService.get().subscribe((comment_likes) => {
        comment_likes.forEach((comment_like) => {
          if (comment_like.comment?.id === this.post_comment?.id && comment_like.who_likes?.id == me?.id) {
            this.comment_like = comment_like;
            this.liked = true;
            this.emotion = comment_like.emotion;
          }
        });
      });
    });
    this.emotion_service.get_emotions().subscribe((emotions) => {     
      this.emotions = this.Comment_Like_Refresh(this.post_comment, emotions);
      console.log("emotions:", this.emotions);
      
    });
    this.comment_date_parse = this.Parse_MessageDate(this.post_comment.date);
    this.date_detail = this.formatDateTime(new Date(this.post_comment.date));

    // this.localeStorageService.me$.subscribe((me) => {
    //   if (this.post_comment.user.id === me.id) this.is_me = true;
    // });
  }

  Comment_Like_Refresh(comment: Comment, emotions: Emotion[]) {
    let my_emotions = emotions;
    for (const my_emotion of my_emotions) {
      my_emotion.comment_likes = my_emotion.comment_likes.filter(
        (comment_like) => comment_like.comment?.id === comment.id
      );
    }
    return my_emotions;
  }

  CommentLike(event: MouseEvent, emotion: Emotion | null) {
    event.stopPropagation();

    if (emotion && !this.liked) {
      console.log('add like');

      this.emotion = emotion;
      const comment_like: CommentLike = {
        who_likes: this.me,
        comment: this.post_comment,
        id: '',
        emotion: emotion,
      };

      this.commentLikeService.add_like(comment_like).subscribe((createdCommentLike) => {
        this.commentService.getCommentById(this.post_comment.id).subscribe((comment) => {
          this.post_comment.comment_likes = comment.comment_likes;
          this.liked = true;
          this.comment_like = createdCommentLike;

          console.log('asas:', this.post_comment.comment_likes);

          for (const emotion of this.emotions) {
            if (emotion.id === comment_like.emotion.id) emotion.comment_likes.push(createdCommentLike);
          }
        });
      });
    } else if (emotion && this.liked) {
      console.log('change emoji');
      console.log('like', this.comment_like);

      this.comment_like.emotion = emotion;
      this.commentLikeService
        .change_emotion(this.comment_like.id, this.comment_like)
        .subscribe((changed_comment_like) => {
          this.emotion = changed_comment_like.emotion;
          this.comment_like = changed_comment_like;
          this.commentService.getCommentById(this.post_comment.id).subscribe((comment) => {
            this.post_comment.comment_likes = comment.comment_likes;
            this.emotion_service.get_emotions().subscribe((emotions) => {
              this.emotions = this.Comment_Like_Refresh(comment, emotions);
            });
          });
        });
    } else {
      console.log('delete like');
      console.log('post comments', this.post_comment);
      console.log('LO',this.post_comment.comment_likes.find(
        (comment_like) => comment_like.who_likes?.id === this.me.id
      ));
      let comment_like_id = this.post_comment.comment_likes.find(
        (comment_like) => comment_like.who_likes?.id === this.me.id
      )?.id;

      this.commentLikeService.delete(comment_like_id).subscribe((deletedCommentLike) => {
        this.commentService.getCommentById(this.post_comment.id).subscribe((comment) => {
          this.liked = false;
          this.post_comment.comment_likes = comment.comment_likes;
          this.emotion_service.get_emotions().subscribe((emotions) => {
            this.emotions = this.Comment_Like_Refresh(this.post_comment, emotions);
          });
        });
      });
    }
  }

  CommentActionActivate() {
    this.active_actions = !this.active_actions;
  }

  CommentRemove(comment_id: string) {
    this.commentService
      .RemoveComment(comment_id)
      .subscribe((deleted_comment) => {
        this.post_comment = null;
      });
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
