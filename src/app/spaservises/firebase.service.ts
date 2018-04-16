import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class FirebaseService {
  
  noteList: AngularFireList<any>;
  commentList: AngularFireList<any>;

  constructor(private firebasedb:AngularFireDatabase) {

  }

  getNoteList(){
    this.noteList = this.firebasedb.list('queryes');
    return this.noteList;
  }

  getCommentList(){
    this.commentList = this.firebasedb.list('comments');
    return this.commentList;
  }

  addNote(id: number, title: string, content: string){
    this.noteList.push({
      id: id,
      title: title,
      content: content
    });
  }

  addComment(notes_id: number, comAuthor: string, comContent: string, date: string){
    this.commentList.push({
        notes_id: notes_id,
        date: date,
        author: comAuthor,
        content: comContent
    });
  }

  updateNoteA($key: string, item: any){
    this.noteList.update($key, item);
  }

  removeNote($key: string){
    this.noteList.remove($key);
  }
  removeNoteComents($key: string){
    this.commentList.remove($key);
  }

}
