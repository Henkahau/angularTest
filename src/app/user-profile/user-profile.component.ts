import { Component, OnInit, Output } from '@angular/core';
import { User, Event } from '../_models/index'
import { UserService, AlertService, AuthenticationService, EventService } from '../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  moduleId: module.id
})

export class UserProfileComponent implements OnInit {
  
  model: any = {};
  currentUser: User;
  hostedEvents: Event[];
  joinedEvents: Event[];
  userProfileId: string;
  imagePath: string = '../../assets/Images/default_profile_image.png'; 

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              protected eventService: EventService,
              private router: Router) {
                 var currUser = JSON.parse(localStorage.getItem('currentUser'));
                 this.currentUser = currUser.Account;
                
                 EventService.refreshEventList.subscribe(res =>{
                   this.loadProfile();
                 })
                }

  ngOnInit() {
    this.loadProfile();
    console.log(this.currentUser.profilePicture);
  }

  private loadProfile(){
    this.userService.getById(this.currentUser.accountId).subscribe(user => {
      this.currentUser = user[0];
      this.joinedEvents = this.currentUser.events;
      this.hostedEvents = this.currentUser.hostedEvents;     
    });
  }

  navigate(destination: string) {
    switch(destination) {
      case 'edit':
      this.router.navigate(['/edit-profile']);
      break;

      case 'home':
      this.router.navigate(['']);
      break;
    }
  }
}
