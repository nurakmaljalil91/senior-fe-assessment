import {Component, OnInit} from '@angular/core';
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {

  selectedImage: string = 'https://vst-test-images.s3.ap-southeast-1.amazonaws.com/sfe-images/00610.png';

  constructor(private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.imageService.selectedImage.subscribe({
      next: (image) => {
        this.selectedImage = image;
        console.log(this.selectedImage)
      }
    });
  }
}
