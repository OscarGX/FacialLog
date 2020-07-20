import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentsService } from '../../../services/students.service';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../../models/student.model';
import { FaceApiService } from 'src/app/services/face-api.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { VerifyAPIRequest } from '../../../models/verify-request.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit, OnDestroy{
  student: Student;
  exist = false;
  exp = false;
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    targetHeight: 1080,
    targetWidth: 1920
  };
  studentCollRef: Subscription;

  constructor(private ss: StudentsService, private route: ActivatedRoute, private fas: FaceApiService, private camera: Camera,
              private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    const id = this.route.snapshot.paramMap.get('id');
    this.studentCollRef = this.ss.getStudentById(id).subscribe(data => {
      if (!data.payload.exists) {
        this.exist = true;
      } else {
        this.student = data.payload.data();
        this.student.id = data.payload.id;
        this.verify();
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.studentCollRef.unsubscribe();
  }

  private verify() {
    if (this.student.faceId === 'not today flash') {
      this.generateFaceData();
    } else {
      if (this.faceIdExpires()) {
        this.exp = true;
        this.generateFaceData();
      }
    }
  }

  private updateStudentData() {
    this.ss.updateStudent(this.student.id, {expiresIn: this.student.expiresIn, faceId: this.student.faceId})
      .then(resp => {
        // aquí se actualiza el registro
      })
      .catch(err => {
        console.log(err);
      });
  }

  private generateFaceData() {
    this.fas.faceDetectByUrl(this.student.img).subscribe(data => {
      if (data.length > 0) {
        this.student.expiresIn = this.getExpiresIn();
        this.student.faceId = data[0].faceId;
        this.exp = false;
        this.updateStudentData();
      } else {
        console.log('la imagen no es válida');
      }
    });
  }

  private getExpiresIn(): number {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + (23 * 60 * 60 * 1000));
    return tomorrow.getTime();
  }

  private faceIdExpires(): boolean {
    const now = new Date();
    const expires = new Date(this.student.expiresIn);
    return now.getTime() >= expires.getTime();
  }

  takePicture() {
    this.camera.getPicture(this.options).then(async (imageData) => {
      this.presentLoading('Espere mientras se comparan los rostros...');
      const img: Blob = await this.fas.base64toBlob('data:image/jpeg;base64,' + imageData);
      this.fas.faceDetectByBinaryData(img).subscribe(data => {
        if (data.length >= 1) {
            /* console.log(data);
            console.log(this.student.faceId); */
            this.verifyFaces({faceId1: this.student.faceId, faceId2: data[0].faceId});
        } else {
          this.loadingCtrl.dismiss();
          this.presentAlert('Error', 'La foto no tiene un rostro que escanear, intenta nuevamente');
        }
      });
     }, (err) => {
      this.loadingCtrl.dismiss();
      this.presentAlert('Error', 'No se pudo capturar la foto');
     });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading(message: string) {
    const loading = await this.loadingCtrl.create({
      message
    });
    await loading.present();
  }

  private verifyFaces(ids: VerifyAPIRequest) {
    this.fas.faceVerify(ids).subscribe(data => {
      let msg = '';
      this.loadingCtrl.dismiss();
      if (data.isIdentical) {
        msg = `
        Bien! El estudiante ${this.student.name} coincide con la foto tomada.
        Nivel de confianza: ${Math.floor(data.confidence * 100)}%
        `;
        this.presentAlert('Aceptado', msg);
      } else {
        msg = `
        Uy! El estudiante ${this.student.name} no coincide con la foto tomada.
        Nivel de confianza: ${Math.floor(data.confidence * 100)}%
        `;
        this.presentAlert('Rechazado', msg);
      }
    });
  }

}
