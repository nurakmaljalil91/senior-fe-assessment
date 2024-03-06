import {Component, OnInit} from '@angular/core';
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  images: string[] = [];
  paginatedImages: string[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;

  constructor(private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.imageService.getImagesUrl().subscribe({
      next: (images) => {
        for (let image of images.split(/[\r\n]+/)) {
          this.images.push(image);
        }
        this.paginatedImages = this.getPaginatedImages();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getPaginatedImages(): string[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.images.slice(start, end);
  }

  nextPage(): void {
    this.currentPage++;
  }

  previousPage(): void {
    this.currentPage--;
  }

  get isPreviousDisabled(): boolean {
    return this.currentPage === 1;
  }

  get isNextDisabled(): boolean {
    return this.currentPage === Math.ceil(this.images.length / this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.images.length / this.itemsPerPage);
  }
}
