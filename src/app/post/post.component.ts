import { Component, OnInit } from '@angular/core';
import { PostService } from "../service/post.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {


  postAll:any
  format = 'data:image/jpeg;base64,';
  currentIndex = -1;
  prenom:any
  page = 1;
  count : any;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private post:PostService,private route:Router) { }

  ngOnInit(): void {
    this.allPost();
  }

  getRequestParams(searchTitle, page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (searchTitle) {
      params[`prenom`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  handlePageChange(event): void {
    this.page = event;
    this.allPost();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.allPost();
  }
  getIt(id){
    localStorage.setItem("idBlog",id)
    console.log(localStorage.getItem("idBlog"));
    this.route.navigate(['/blog'])
    
  }

  allPost(){
    const params = this.getRequestParams(this.prenom, this.page, this.pageSize);
    console.log(this.prenom
      +this.page+this.pageSize);
    
      this.post.getAll(params ).subscribe(
        (res)=>{
          
          this.count=res.length;
          this.postAll=res;
          console.log(this.postAll);
          
        },(err)=>{
          console.log(err)
        }
      )
  }

}
