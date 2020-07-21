import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private studentsCollection: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.studentsCollection = this.db.collection<Student>('students');
  }

  getStudents(id: string) {
    return this.db.collection<Student>('students', ref => ref.where('group', '==', id)).snapshotChanges()
            .pipe(map((res: DocumentChangeAction<Student>[]) => res.map(doc => {
              const data = doc.payload.doc.data() as Student;
              data.id = doc.payload.doc.id;
              return data;
            })));
  }

  getStudentById(id: string) {
    return this.studentsCollection.doc<Student>(id).snapshotChanges();
  }

  updateStudent(id: string, student: {expiresIn: number, faceId: string}) {
    return this.studentsCollection.doc<Student>(id).update(student);
  }
}
