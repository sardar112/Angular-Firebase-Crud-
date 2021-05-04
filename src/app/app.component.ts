import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from './crud.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'firebaseTask';
public data: any=[];
public editable: boolean = false;
public editID
constructor(private crud:CrudService,private fb:FormBuilder,private http:HttpClient){}
taskForm: FormGroup;

ngOnInit() {
  this.taskForm=this.fb.group({
   title:"",
   description:"",
  });

  this.crud.getData().subscribe(res => {
    this.data=res
    console.log(res);
//const d=JSON.stringify(res);
 //  console.log(d);
 //  this.data.push(d);
// console.log(JSON.parse(d));
  })
}

public form(){
  if(this.editable){
  this.crud.editData(this.editID,this.taskForm.value).subscribe(data =>{
    console.log(data);
    this.crud.getData().subscribe(res=>{
      this.data=res;
    })
  })
 
  }else{
    this.crud.addData(this.taskForm.value).subscribe(res=>{
       console.log(res);
       this.crud.getData().subscribe(res=>{
        this.data=res;
      })
     });
  }

}
onEdit(id,indx){
//console.log(id);
//console.log(this.data[indx]);
this.editID=id;
this.editable=true
this.taskForm.setValue({
  title:this.data[indx].title,
  description:this.data[indx].description,
})
}



onDelete (id){
this.crud.deleteData(id).subscribe(res=>{
  this.crud.getData().subscribe(res=>{
    this.data=res;
  })
console.log(res);
})
}
}
