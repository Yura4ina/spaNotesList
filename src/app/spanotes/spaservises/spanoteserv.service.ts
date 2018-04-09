import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class SpanoteservService {
	noteList: AngularFireList<Query>;
	constructor(private firebasedb:AngularFireDatabase) { }

	getNoteList(){
		this.noteList = this.firebasedb.list('queryes');
		return this.noteList;
	}

	addQuery(author: string, content: string){
		this.noteList.push({
			author: author,
			content: content,
			coments: {}
		});
	}

	addComment(comAuthor: string, comContent: string){
		this.noteList.coments.push({
				comAuthor: comAuthor,
				comContent: comContent
		});
	}

	removeQuery($key: string){
		this.noteList.remove($key);
	}

}
