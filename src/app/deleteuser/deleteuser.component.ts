import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.component.html',
  styleUrls: ['./deleteuser.component.css']
})
export class DeleteuserComponent implements OnInit {

  @ViewChild('f') deleteForm : NgForm; 
  constructor(private activatedRoute : ActivatedRoute, private restService : RestService, private router : Router) { }
  user_id : string;
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      this.user_id = params.user_id;
    });
  }

  onSubmit() {
    let url = "user/deleteUser/"+this.user_id;
    this.restService.delete(url).subscribe((res) => {
      console.log(res);
      alert("Successfully deleted");
      this.router.navigate(['fetch']);
    }, (err) => {
      alert("Something went wrong please try again")
    })
  }

}
