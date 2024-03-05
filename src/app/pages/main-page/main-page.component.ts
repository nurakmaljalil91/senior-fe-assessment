import {Component, OnInit} from '@angular/core';
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{

  images: string[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.imageService.getImagesUrl().subscribe(images => {
      this.images = images
      console.log(this.images);
    });
  }


}
