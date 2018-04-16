import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../spaservises/firebase.service';

@Component({
  selector: 'app-notes-form',
  templateUrl: './notes-form.component.html',
  styleUrls: ['./notes-form.component.css'],
  providers : [FirebaseService]
})
export class NotesFormComponent implements OnInit {
  spaOueryListArray: any[];
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getNoteList().snapshotChanges()
		.subscribe( item => {
			this.spaOueryListArray = [];
			item.forEach(element => {
				var x = element.payload.toJSON();
				x["$key"] = element.key;
				this.spaOueryListArray.push(x);
			})
		})
  }

  onAddNote_(authorItemQuery,contentItemQuery){
		var id = 0;
		this.spaOueryListArray.forEach(element => {	
			id++;
			if(id == this.spaOueryListArray.length){
				id = element.id+1;
				console.log(id);
			}
		});
		this.firebaseService.addNote(id, authorItemQuery.value, contentItemQuery.value);
    	authorItemQuery.value = null;
		contentItemQuery.value = null;
  }
  
}
