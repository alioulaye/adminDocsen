import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PostService } from "../service/post.service";
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blog:any
  ImageBaseData:any
  format = 'data:image/jpeg;base64,';

  constructor(private post:PostService,private toast:ToastrService,private route:Router ) {
    this.blog={
      id:0,
      title:'',
      content:'',
      dateCreate:Date,
      dateUp:Date,
      image:'',
      username:'',
      dateCreateUp:''
    }
  }

  update=false;
  ngOnInit(): void {
    if(localStorage.getItem("idBlog")!=null){
      console.log(localStorage.getItem("idBlog"));

      this.getOne(localStorage.getItem("idBlog"))
      this.update=true;
      localStorage.removeItem("idBlog");
    }
  }

  afficher=false;
  handleFileInput(files: FileList) {
    this.afficher=true;
    let me = this;
    let file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      me.ImageBaseData=reader.result;

    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

 getOne(id){
   this.post.getOnePost(id).subscribe(
     (res)=>{
       //console.log(res);
       this.blog=res
       console.log(this.blog);

     },(erreur)=>{
       console.log(erreur);

     }
   )

 }

 envoye(){
  console.log(this.blog);
  let today = new Date();
  let dd = String(today. getDate()). padStart(2, '0');
  let mm = String(today. getMonth() + 1). padStart(2, '0'); //January is 0!
  let yyyy = today. getFullYear();
  this.blog.dateCreateUp = dd+'/'+mm+'/'+yyyy;

   this.blog.username=sessionStorage.getItem('username')
   if(this.afficher==true){
   this.ImageBaseData=this.ImageBaseData.split(',')[1];
    this.blog.image=this.ImageBaseData.toString();
   }

   console.log(this.blog);
   if(this.blog.id!=0){

    this.post.AddPost(this.blog).subscribe(
      (res)=>{
        console.log(res);
        if(res.body.status=="ok"){
          this.toast.success('Mise à jour reussit','Succes')
          this.route.navigate(['/post'])
        }else{
          this.toast.error('erreur du mise à jour','Error')
        }

      },(error)=>{
        console.log(error);

      }
    )

   }else{

    this.post.AddPost(this.blog).subscribe(
      (res)=>{
        console.log(res);
        if(res.body.status=="ok"){
          this.toast.success('insertion reussit','Succes');
        }else{
          this.toast.error('erreur d\'insertion','Error');
        }

      },(error)=>{
        console.log(error);

      }
    )
   }



 }

}
