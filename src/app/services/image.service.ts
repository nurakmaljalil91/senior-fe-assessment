import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  getImagesUrl(): Observable<string[]> {
    return this.http.get<string[]>('https://vst-test-images.s3.ap-southeast-1.amazonaws.com/sfe-images/image_paths.txt');
  }
}
