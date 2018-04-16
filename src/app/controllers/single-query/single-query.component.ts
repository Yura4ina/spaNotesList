import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../spaservises/firebase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-query',
  templateUrl: './single-query.component.html',
  styleUrls: ['./single-query.component.css'],
  providers : [FirebaseService]
})
export class SingleQueryComponent implements OnInit {	
  spaNoteListArray: any[];
	spaCommentListArray: any[];
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

}
