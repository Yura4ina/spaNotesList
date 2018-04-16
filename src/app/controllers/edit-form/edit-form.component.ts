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
	spaOueryListArray: any[];
	id =  this.aRoute.snapshot.paramMap.get('id');
  constructor(private firebaseService: FirebaseService, private aRoute: ActivatedRoute) { }

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

  onEditNote_($key, queryAut, queryCont){
		this.firebaseService.updateNoteA($key, {author: queryAut.value, content: queryCont.value});
		queryAut.value = null;
		queryCont.value = null;
	}
}
