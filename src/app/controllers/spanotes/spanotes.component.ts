import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../spaservises/firebase.service';
import { LocalstorageService } from '../../spaservises/localstorage.service'
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-spanotes',
  templateUrl: './spanotes.component.html',
  styleUrls: ['./spanotes.component.css'],
  providers : [FirebaseService,LocalstorageService]
})

export class SpanotesComponent implements OnInit {
	spaNoteListArray: any[];
	spaCommentListArray: any[];
	type = this.appComp.getType();

	constructor(private firebaseService: FirebaseService, private localStService: LocalstorageService, private appComp: AppComponent) { }

	ngOnInit() {
		if(this.type == "1"){
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
		}else{
			this.spaNoteListArray =  JSON.parse(localStorage.getItem('notes'));
			this.spaCommentListArray = JSON.parse(localStorage.getItem('comments'));
		}
	}

	onAddComment(key, comTitle, comCont){
		var d = new Date();
		var month =  d.getUTCMonth();
		month++;
		var n = d.getDate() + "-" + month + "-" + d.getFullYear() + " / " + d.getHours() + " : " + d.getMinutes();
		var id = 0;
	
		if(this.type == "1"){
			this.firebaseService.addComment(key, comTitle.value, comCont.value, n);
		}else{
			if(this.spaCommentListArray == null){
				id = 0;
			}else{
				this.spaCommentListArray.forEach(element => {	
					id++;
					if(id == this.localStService.commentsList.length){
						id = this.localStService.commentsList.length; 
					}
				});
			}
			this.localStService.addComment({id: id, notes_id: key, author: comTitle.value, content: comCont.value, date: n});
			this.spaCommentListArray =  JSON.parse(localStorage.getItem('comments'));
		}
		comTitle.value = null;
		comCont.value = null;
	}

	onDeleteNote(key){
		if(this.type == "1"){
			this.spaNoteListArray.forEach(element => {
				if(element.id == key){
					this.firebaseService.removeNote(element.$key);
				}
			});
		}else{
			this.localStService.onRemoveNote(key);
			this.spaNoteListArray =  JSON.parse(localStorage.getItem('notes'));
		}

	}
	// onDeleteComents(note.id);
	// onDeleteComents(key){
	// 	if(this.type == "1"){
	// 		this.spaCommentListArray.forEach(element => {
	// 			if(element.notes_id == key){			
	// 				this.firebaseService.removeNoteComents(element.$key);
					
	// 			}
	// 		});
	// 	}else{
	// 		this.localStService.onRemoveComment(key);
	// 		this.spaCommentListArray = JSON.parse(localStorage.getItem('comments'));
	// 	}
	// }

}
