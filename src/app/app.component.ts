import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  radiob = '1';

  setType(val){
    this.radiob = val;
  }
  
  getType(){
    return this.radiob;
  }
}
