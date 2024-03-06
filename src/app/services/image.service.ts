import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private _images: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  public readonly images: Observable<string[]> = this._images.asObservable();

  private _selectedImage: BehaviorSubject<string> = new BehaviorSubject<string>('https://vst-test-images.s3.ap-southeast-1.amazonaws.com/sfe-images/00610.png');

  public readonly selectedImage: Observable<string> = this._selectedImage.asObservable();

  constructor(private http: HttpClient) {
  }

  getImagesUrl(): Observable<string> {
    return this.http.get<string>('assets/image_paths.txt', {responseType: 'text' as 'json'});
  }

  loadImages(): void {
    this.getImagesUrl().subscribe({
      next: (images) => {
        const imagesArray = images.split(/[\r\n]+/);
        this._images.next(imagesArray);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getImages(): string[] {
    return this._images.getValue();
  }


  setSelectedImage(imageUrl: string): void {
    this._selectedImage.next(imageUrl);
    this._images.getValue().splice(this._images.getValue().indexOf(imageUrl), 1);
  }
}
