import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../rest.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  @ViewChild('f') userForm : NgForm;
  constructor(private activatedRoute : ActivatedRoute, private restService : RestService) { }

  userData : any;
  defName : string;
  defEmail : string;
  defAddress : string;
  user_id;
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      let id = params.user_id;
      this.user_id = id;
      console.log(id);
      this.restService.get('user/fetchUser/'+id).subscribe((userRes : any) => {
        this.userData = userRes.data;
        this.defAddress = this.userData.address;
        this.defName = this.userData.name;
        this.defEmail = this.userData.email;
      }, (err) => {
        alert("Something went wrong please try again")
      })
    })
  }
  onSubmit() {
    let url = "user/updateUser/"+this.user_id;

    this.restService.put(url, {name : this.defName, email : this.defEmail, address : this.defAddress}).subscribe((res) => {
      console.log(res);
      alert("Successfully updated")
    }, (err) => {
      alert("Something went wrong please try again")
    })
  }

}
