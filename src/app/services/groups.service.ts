import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Group } from '../models/group.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  constructor(private db: AngularFirestore) {
  }

  getGroups(id: string) {
    return this.db.collection<Group>('groups', ref => ref.where('career', '==', id)).snapshotChanges()
      .pipe(map((res: DocumentChangeAction<Group>[]) => res.map(doc => {
        const group = doc.payload.doc.data();
        group.id = doc.payload.doc.id;
        return group;
      })));
  }
}
