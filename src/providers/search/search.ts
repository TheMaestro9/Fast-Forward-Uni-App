import { Injectable } from '@angular/core';

/*
  Generated class for the SearchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchProvider {

  posts=[]
  constructor() {
  }

  initializeItems (posts) {
    this.posts = posts ; 
  }

  search(q , posts) {
    // Reset items back to all of the items
    // set val to the value of the searchbar
    let val = q.target.value;

    if( val.trim() == '') 
      return this.posts
    if(this.posts.length ==0 )
      this.posts = posts 
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      posts = this.posts.filter((item) => {
        if (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
        if (item.content.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
        return false;
      })
    }

    return posts ; 
  }

}
