import { NotesService } from './../../core/services/notes.service';
import { Component, OnInit } from '@angular/core';
import {MatDialog, } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { NoteData } from 'src/app/core/interfaces/note-data';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  allNotes:NoteData[]=[]
  searchValue:string=''
 
  constructor(public dialog: MatDialog,
             private noteService:NotesService,
            
    ) {}
ngOnInit(): void {
  this.noteService.getUserNotes().subscribe({
    next:(res)=>{
      if(res.msg==="done"){
        console.log(res);
        this.allNotes=res.notes
      }
    }
  })
}
  openDialog(noteData?:NoteData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '400px',
      width: '600px',
      data:{title:noteData?.title,content:noteData?.content,_id:noteData?._id },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit()
    });
}
deleteNote(deletedNote:any,noteIndex:any){
  console.log(deletedNote,noteIndex)
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      }).then(()=>{
        this.noteService.handleDeleteNote(deletedNote).subscribe({
          next:(res)=>{
            console.log(res);
            if(res.msg==="done"){
              this.allNotes.splice(noteIndex,1)
              this.ngOnInit()
            }
          }
        })
      })

    }
  });
}

updateNote(noteDetail:NoteData,noteIndex:number){
console.log(noteDetail,noteIndex);
this.openDialog({title:noteDetail.title ,content:noteDetail.content,_id:noteDetail._id})
console.log(noteDetail.title,noteDetail.content,noteDetail._id);

}
}

