import { Component, OnInit } from '@angular/core';
import { SpanoteservService } from './spaservises/spanoteserv.service';

@Component({
  selector: 'app-spanotes',
  templateUrl: './spanotes.component.html',
  styleUrls: ['./spanotes.component.css'],
  providers : [SpanoteservService]
})
export class SpanotesComponent implements OnInit {
	spaNotesListArray: any[];
  	constructor(private spanoteservService: SpanoteservService) { }

	ngOnInit() {
		this.spanoteservService.getNoteList().snapshotChanges()
		.subscribe( item => {
			this.spaNotesListArray = [];
			item.forEach(element => {
				var x = element.payload.toJSON();
				x["$key"] = element.key;
				this.spaNotesListArray.push(x);
			})
		})
	}

	onAddQuery(authorItemQuery,contentItemQuery){
		this.spanoteservService.addQuery(authorItemQuery.value,contentItemQuery.value);
		authorItemQuery.value = null;
		contentItemQuery.value = null;
	}

	onAddComment(comAuthorItemQuery,comContentItemQuery){
		this.spanoteservService.addQuery(comAuthorItemQuery.value,comContentItemQuery.value);
		comAuthorItemQuery.value = null;
		comContentItemQuery.value = null;
	}
}
