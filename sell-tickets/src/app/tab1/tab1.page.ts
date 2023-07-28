import { Component, OnInit } from '@angular/core';
import database from 'firebase';
import { ref, set,get, child } from 'firebase/database';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  numberSold:Array<any>=[];
  results:Array<any>=[]
  constructor() {
   
  }
  ngOnInit(){
    this.callNumberSold(); 
  }
  ionViewWillEnter(){
    this.callNumberSold(); 
  }

  handleRefresh(event:any){
    this.callNumberSold(); 
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 1000);

  }
  callNumberSold(){
    this.getNumberSold().then((numberSold:any) => {
      this.numberSold =numberSold;
      this.results= [...numberSold];
    });
  }
  handleInput(event:any) {
    const query = event.target.value.toLowerCase();
    this.results = this.numberSold.filter((d) => d.owner.name.toLowerCase().indexOf(query) > -1);
  }
  getNumberSold(){
    const dbRef = ref(database);
    return get(child(dbRef, `numbersSold`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          return [];
        }
      })
      .catch(() => {
        return [];
      });
  };
}
