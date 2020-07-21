import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'studentsFilter'
})
export class StudentsFilterPipe implements PipeTransform {

  transform(array: any[], qry: string, filterBy: string): any[] {
    qry = qry.toLowerCase();
    return array.filter(item => item[filterBy].toLowerCase().includes(qry));
  }

}
