import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-fetchuser',
  templateUrl: './fetchuser.component.html',
  styleUrls: ['./fetchuser.component.css']
})
export class FetchuserComponent implements OnInit {

  constructor(private restService : RestService, private router : Router, private activatedRoute : ActivatedRoute) { }

  usersData : any ;
  ngOnInit() {
    this.restService.get('user/fetchUsers').subscribe((res : any) => {
      if(res) {
        this.usersData = res.data;
        console.log(this.usersData)
      } else {
        alert("Something went wrong");
      }
    }, (err : any) => {
      alert("Something went Wrong please try again");
    })
  }

  editUser(user_id) {
    this.router.navigate(['/update'], {queryParams : {user_id : user_id}})
  }

  deleteUser(user_id) {
    this.router.navigate(['/delete'], {queryParams : {user_id : user_id}})
  }

  refreshPage() {
    this.router.navigate(['fetch'])
  }

}
