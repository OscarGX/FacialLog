import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Career } from '../models/career.model';

@Injectable({
  providedIn: 'root'
})
export class CareersService {
  private educationalProgramColl: Observable<Career[]>;

  constructor(private db: AngularFirestore) {
    this.educationalProgramColl = this.db.collection<Career>('educational-programs', ref => ref.orderBy('name', 'asc'))
                                            .valueChanges({idField: 'id'});
  }

  getPrograms() {
    return this.educationalProgramColl;
  }
}
