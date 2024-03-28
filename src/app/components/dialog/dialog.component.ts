import { NotesService } from './../../core/services/notes.service';
import { Component, Inject } from '@angular/core';
// import {MatDialog, MAT_DIALOG_DATA,  MatDialogModule} from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { NoteData } from 'src/app/core/interfaces/note-data';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
constructor(private noteService:NotesService,
  public dialogRef: MatDialogRef<DialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: NoteData, 
  ){} 
noteForm:FormGroup=new FormGroup({
  title:new FormControl(this.data.title ? this.data.title:''),
  content:new FormControl(this.data.content ? this.data.content:''),
})

handelUserAction(form:FormGroup){
console.log(form)
if(!this.data.title && !this.data.content){
  this.addNewNote(form.value)
}else{
  this.updateNote(form.value)
}
}
addNewNote(newNote:NoteData){
  this.noteService.handleAddNote(newNote).subscribe({
    next:(res)=>{
      if(res.msg==="done"){
        console.log(res);
        this.dialogRef.close()
      }
    
    }
  })
}

updateNote(newNote:NoteData){
  this.noteService.handleUpdateNote(newNote,this.data._id).subscribe({
    next:(res)=>{
   
      if(res.msg==="done"){
        console.log(res);
        this.dialogRef.close()
      }    
    }
  })
}
} 
