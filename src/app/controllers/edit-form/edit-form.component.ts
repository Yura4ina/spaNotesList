import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../spaservises/firebase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
  providers : [FirebaseService]
})
export class EditFormComponent implements OnInit {
	spaNoteListArray: any[];
	id =  this.aRoute.snapshot.paramMap.get('id');
  constructor(private firebaseService: FirebaseService, private aRoute: ActivatedRoute) { }

  ngOnInit() {
    this.firebaseService.getNoteList().snapshotChanges()
		.subscribe( item => {
			this.spaNoteListArray = [];
			item.forEach(element => {
				var x = element.payload.toJSON();
				x["$key"] = element.key;
				this.spaNoteListArray.push(x);
			})
		})
  }

  onEditNote_($key, noteTitle, noteCont){
		this.firebaseService.updateNoteA($key, {title: noteTitle.value, content: noteCont.value});
		noteTitle.value = null;
		noteCont.value = null;
	}
}
