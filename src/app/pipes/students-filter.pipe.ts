import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../models/student.model';

@Pipe({
  name: 'studentsFilter'
})
export class StudentsFilterPipe implements PipeTransform {

  transform(students: Student[], qry: string, filterBy: string): Student[] {
    qry = qry.toLowerCase();
    return students.filter(student => student[filterBy].toLowerCase().includes(qry));
  }

  /* private filterBy(studentsArray: Student[], filter: string, qry: string) {
    qry = qry.toLowerCase();
    return studentsArray.filter(student => student[filter].toLowerCase().includes(qry));
  } */

}
