import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  @ViewChild('f') signUpForm : NgForm;

  constructor(private restService : RestService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.signUpForm.value);
    this.restService.postUser('user/createUser', this.signUpForm.value).subscribe((res : any) => {
      console.log(res);
      if(res.token) {
        localStorage.setItem('token', res.token);
      }
      alert("User Created Successfully");
    })

  }

}
