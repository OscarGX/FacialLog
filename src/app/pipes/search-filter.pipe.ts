import { Pipe, PipeTransform } from '@angular/core';
import { Career } from '../models/career.model';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(careers: Career[], query: string, type: string): Career[] {
    /* if (query === '') {
      return careers;
    } */
    query = query.toLowerCase();
    if (type === 'todos') {
      return careers.filter(career => {
        return career['name'].toLowerCase().includes(query);
      });
    } else if (type === 'tsu') {
      return careers.filter(career => {
        return career['name'].toLowerCase().includes(query) && career['modality'].toLowerCase().includes('tsu');
      });
    } else if (type === 'ing') {
      return careers.filter(career => {
        return career['name'].toLowerCase().includes(query) && career['modality'].toLowerCase().includes('ing');
      });
    } else if (type === 'lic') {
      return careers.filter(career => {
        return career['name'].toLowerCase().includes(query) && career['modality'].toLowerCase().includes('lic');
      });
    }
  }

}
