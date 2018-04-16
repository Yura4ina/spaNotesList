import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../spaservises/firebase.service';
import { LocalstorageService } from '../../spaservises/localstorage.service'
import { AppComponent } from '../../app.component';
import { Note } from '../../models/note'

@Component({
  selector: 'app-notes-form',
  templateUrl: './notes-form.component.html',
  styleUrls: ['./notes-form.component.css'],
  providers : [FirebaseService,LocalstorageService]
})
export class NotesFormComponent implements OnInit {
	spaNoteListArray: any[];
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
			})
		}else{
			this.spaNoteListArray =  JSON.parse(localStorage.getItem('notes'));
		}
  }

  onAddNote_(titleItemQuery,contentItemQuery){
		var id = 0;
		if(this.type == "1"){
			this.spaNoteListArray.forEach(element => {	
				id++;
				if(id == this.spaNoteListArray.length){
					id = element.id+1; 
				}
			});
			this.firebaseService.addNote(id, titleItemQuery.value, contentItemQuery.value);
		}else{
			if(this.spaNoteListArray == null){
				id = 0;
			}else{
				this.spaNoteListArray.forEach(element => {	
					id++;
					if(id == this.localStService.notesList.length){
						id = this.localStService.notesList.length; 
					}
				});
			}
			this.localStService.addNote({id: id, title: titleItemQuery.value, content: contentItemQuery.value});
			this.spaNoteListArray =  JSON.parse(localStorage.getItem('notes'));
		}
		
		titleItemQuery.value = null;
		contentItemQuery.value = null;

  }
  
}
