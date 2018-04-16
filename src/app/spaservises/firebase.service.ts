import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class FirebaseService {
  
  queryList: AngularFireList<any>;
  commentList: AngularFireList<any>;

  constructor(private firebasedb:AngularFireDatabase) {

  }

  getNoteList(){
    this.queryList = this.firebasedb.list('queryes');
    return this.queryList;
  }

  getCommentList(){
    this.commentList = this.firebasedb.list('comments');
    return this.commentList;
  }

  addNote(id: number, author: string, content: string){
    this.queryList.push({
      id: id,
      author: author,
      content: content
    });
  }

  addComment(noteId: number, comAuthor: string, comContent: string, date: string){
    this.commentList.push({
        noteId: noteId,
        date: date,
        comAuthor: comAuthor,
        comContent: comContent
    });
  }

  updateNoteA($key: string, item: any){
    this.queryList.update($key, item);
  }

  removeNote($key: string){
    this.queryList.remove($key);
  }
  removeNoteComents($key: string){
    this.commentList.remove($key);
  }

}
