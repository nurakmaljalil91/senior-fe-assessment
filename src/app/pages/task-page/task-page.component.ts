import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {

  selectedImage: string = '';

  constructor() {
  }

  ngOnInit(): void {
    this.selectedImage = localStorage.getItem('selectedImage') || '';
  }
}
