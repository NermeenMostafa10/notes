import { Pipe, PipeTransform } from '@angular/core';
import { NoteData } from '../interfaces/note-data';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(notes: any[], value: string): any[] {
    return notes.filter((note)=>note.title.toLowerCase().includes(value.toLowerCase()));
  }

}
