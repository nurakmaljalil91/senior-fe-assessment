import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private _images: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  public readonly images: Observable<string[]> = this._images.asObservable();

  private _isImageSelected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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
    if (this._isImageSelected.getValue()) return;
    localStorage.setItem('selectedImage', imageUrl);
    this._isImageSelected.next(true);
    this._images.getValue().splice(this._images.getValue().indexOf(imageUrl), 1);
    window.open('/task', '_blank');
  }
}
