import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomColorPipe } from './random-color.pipe';
import { SearchFilterPipe } from './search-filter.pipe';
import { StudentsFilterPipe } from './students-filter.pipe';



@NgModule({
  declarations: [RandomColorPipe, SearchFilterPipe, StudentsFilterPipe],
  imports: [
    CommonModule
  ],
  exports: [RandomColorPipe, SearchFilterPipe, StudentsFilterPipe]
})
export class PipesModule { }
