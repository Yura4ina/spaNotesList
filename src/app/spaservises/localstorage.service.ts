import { Injectable } from '@angular/core';
import { Note } from '../models/note'
import { Comment } from '../models/comment'
import { element } from 'protractor';

@Injectable()
export class LocalstorageService {
  notesList: Note[];
  commentsList: Comment[];

  constructor() {
    this.notesList = [];
    this.commentsList = [];
   }
  getNoteArr(): Note[]{
      this.notesList = JSON.parse(localStorage.getItem('notes'));
    return this.notesList;
  }

  getCommentArr(): Comment[]{
      this.commentsList = JSON.parse(localStorage.getItem('comments'));
    return this.commentsList;
  }

  addNote(note: Note):void{
      this.notesList.unshift(note);
        // localStorage.setItem('notes', JSON.stringify( this.notesList));
      let notes;
      if(localStorage.getItem('notes') === null){
        notes = [];
        notes.unshift(note);
        localStorage.setItem('notes', JSON.stringify(notes));
      }else{
        notes = JSON.parse(localStorage.getItem('notes'));
        notes.unshift(note);
        localStorage.setItem('notes', JSON.stringify(notes));
      }
  }

  addComment(comment: Comment):void{    
    this.commentsList.unshift(comment);
      // localStorage.setItem('comments', JSON.stringify( this.commentsList));
    let comments;
    if(localStorage.getItem('comments') === null){
      comments = [];
      comments.unshift(comment);
      localStorage.setItem('comments', JSON.stringify(comment));
    }else{
      comments = JSON.parse(localStorage.getItem('comments'));
      comments.unshift(comment);
      localStorage.setItem('comments', JSON.stringify(comment));
    }
  }

  onUpdateNote(noteId: number, note: Note):void{
    this.notesList.forEach(element => {
      if(noteId == element.id){
        this.notesList[noteId] = note;
        localStorage.setItem('notes', JSON.stringify(this.notesList));
      }
    });
  }

  onRemoveNote(noteId: number){
    this.getNoteArr();
    this.notesList.forEach(element => {
      if(noteId == element.id){
        let idd = this.notesList.length-noteId-1;
        this.notesList.splice(idd, 1);      
        localStorage.setItem('notes', JSON.stringify(this.notesList));
      }
    });
  }
  
  onRemoveComment(commentId: number){
    this.getCommentArr();
    this.commentsList.forEach(element => {
      if(commentId == element.notes_id){
        this.commentsList.slice(commentId, 1);
      }
    });
    localStorage.setItem('comments', JSON.stringify(this.commentsList));
  }
}
