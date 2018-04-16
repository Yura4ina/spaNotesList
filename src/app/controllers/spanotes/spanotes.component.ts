import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../spaservises/firebase.service';
import { AppComponent } from '../../app.component'

@Component({
  selector: 'app-spanotes',
  templateUrl: './spanotes.component.html',
  styleUrls: ['./spanotes.component.css'],
  providers : [FirebaseService]
})

export class SpanotesComponent implements OnInit {
	spaNoteListArray: any[];
	spaCommentListArray: any[];
  	constructor(private firebaseService: FirebaseService, private appComp: AppComponent) { }

	ngOnInit() {
		this.firebaseService.getNoteList().snapshotChanges()
		.subscribe( item => {
			this.spaNoteListArray = [];
			item.forEach(element => {
				var x = element.payload.toJSON();
				x["$key"] = element.key;
				this.spaNoteListArray.push(x);
			})
		}),
		this.firebaseService.getCommentList().snapshotChanges()
		.subscribe( item => {
			this.spaCommentListArray = [];
			item.forEach(element => {
				var x = element.payload.toJSON();
				x["$key"] = element.key;
				this.spaCommentListArray.push(x);
			})
		})

	}


	onAddNote(authorItemQuery,contentItemQuery){
		var id = 0;
		this.spaNoteListArray.forEach(element => {	
			id++;
			if(id == this.spaNoteListArray.length){
				id = element.id+1;
				console.log(id);
			}
		});
		this.firebaseService.addNote(id, authorItemQuery.value, contentItemQuery.value);
    	authorItemQuery.value = null;
		contentItemQuery.value = null;
	}

	onAddComment(key, comAut, comCont){
		var d = new Date();
		var month =  d.getUTCMonth();
		month++;
		var n = d.getDate() + "-" + month + "-" + d.getFullYear() + " / " + d.getHours() + " : " + d.getMinutes();
		this.firebaseService.addComment(key, comAut.value, comCont.value, n.toString());
		comAut.value = null;
		comCont.value = null;
	}

	onEditNote($key, comAut, comCont){
		this.firebaseService.updateNoteA($key, {author: comAut.value, content: comCont.value});
		comAut.value = null;
		comCont.value = null;
	}

	onDeleteNote(key){
		this.spaNoteListArray.forEach(element => {
			if(element.id == key){
				this.firebaseService.removeNote(element.$key);
			}
		});
	}
	onDeleteComents(key){
		this.spaCommentListArray.forEach(element => {
			if(element.key == key){
				this.firebaseService.removeNoteComents(element.$key);
			}
		});
	}

	chooseSaveArea(flag: boolean){
		if(flag){
			return 0;
		}
		else{
			return 1;
		}
	}

	onChType(){
		console.log(this.appComp.getType());
	}

}
