import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-share',
  templateUrl: './post-share.component.html',
  styleUrls: ['./post-share.component.scss'],
})
export class PostShareComponent implements OnInit {
  constructor() {}
 
  imagePreviewSrc: string | ArrayBuffer | null | undefined = '';
  isImageSelected: boolean = false;

  onChangeImage(event: any) {
    let selectedFile = (event.target as HTMLInputElement).files?.item(0);
    
   if (selectedFile) {    
      if (["image/jpeg", "image/png", "image/svg+xml"].includes(selectedFile.type)) {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(selectedFile);

        fileReader.addEventListener('load', (event) => {
          this.imagePreviewSrc = event.target?.result;
          this.isImageSelected = true
        })
      }
    } else {
      this.isImageSelected = false
    }


  }

  choseImage(element:any) {
    element.click();    
  }

  closeImage() {
    this.isImageSelected = false
  }
  ngOnInit(): void {}
}
