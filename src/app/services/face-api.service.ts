import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FaceDetect } from '../models/face-detect.model';
import { FaceVerify } from '../models/fade-verify.model';
import { VerifyAPIRequest } from '../models/verify-request.model';

@Injectable({
  providedIn: 'root'
})
export class FaceApiService {
  private url = 'https://southcentralus.api.cognitive.microsoft.com/face/v1.0';
  private key = 'your-api-key-here-xxxxxxxxxxxxxx';
  private detectHeadersUrl = new HttpHeaders({
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': this.key
  });
  private detectHeadersBinary = new HttpHeaders({
    'Content-Type': 'application/octet-stream',
    'Ocp-Apim-Subscription-Key': this.key
  });
  private detectQuery = new HttpParams().append('returnFaceId', 'true')
                                        .append('returnFaceLandmarks', 'false')
                                        .append('returnRecognitionModel', 'false')
                                        .append('recognitionModel', 'recognition_02')
                                        .append('detectionModel', 'detection_02');

  constructor(private http: HttpClient) {}

  faceDetectByUrl(urlImage: string) {
    const raw = JSON.stringify({
      url: urlImage
    });
    return this.http.post<FaceDetect[]>(`${this.url}/detect`, raw, {headers: this.detectHeadersUrl, params: this.detectQuery});
  }

  faceDetectByBinaryData(image: Blob) {
    return this.http.post<FaceDetect[]>(`${this.url}/detect`, image, {headers: this.detectHeadersBinary, params: this.detectQuery});
  }

  faceVerify(ids: VerifyAPIRequest) {
    return this.http.post<FaceVerify>(`${this.url}/verify`, JSON.stringify(ids), {headers: this.detectHeadersUrl});
  }

  async base64toBlob(image) {
    const resp = await fetch(image);
    const imgBlob = await resp.blob();
    return imgBlob;
  }

}
