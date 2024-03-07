import {Component, OnInit} from '@angular/core';
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  paginatedImages: string[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  showModal: boolean = false;
  selectedImageUrl: string = '';

  constructor(private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.imageService.loadImages();

    this.imageService.images.subscribe({
      next: (images) => {
        this.paginatedImages = images;
      }
    });
  }

  getPaginatedImages(): string[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.imageService.getImages().slice(start, end);
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
    return this.currentPage === Math.ceil(this.imageService.getImages().length / this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.imageService.getImages().length / this.itemsPerPage);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  setImageToTaskPage(image: string): void {
    this.imageService.setSelectedImage(image);
  }

  openModal(imageUrl: string): void {
    this.selectedImageUrl = imageUrl;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
