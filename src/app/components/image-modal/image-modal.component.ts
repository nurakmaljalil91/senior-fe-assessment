import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit{
  @Input() showModal: boolean = false;
  @Input() imageUrl: string = '';
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
  }

  close(): void {
    this.showModal = false;
    this.closeModal.emit(false);
  }

  assignToTask(): void {
    this.imageService.setSelectedImage(this.imageUrl);
    this.closeModal.emit(false);

  }
}
