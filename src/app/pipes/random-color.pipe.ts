import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'randomColor'
})
export class RandomColorPipe implements PipeTransform {
  transform(colors: string[]): string {
    return colors[Math.floor(Math.random() * colors.length)];
  }

}
