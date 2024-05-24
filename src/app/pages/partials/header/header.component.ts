import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  stud_search: string = '';
  private userSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  user: any;
  isLoggedIn?: boolean;

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log('IS USER LOGGED IN? ----', this.isLoggedIn);

    // this.authService.getProfile().subscribe({
    //   next: (res) => {
    //     this.user = res.data.user;
    //     console.log('USER DATA ----', this.user);
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // });

    this.userSubscription = this.authService.currentUser$.subscribe((user) => {
      this.user = user;
      console.log('USER DATA ----', this.user);
    });

    this.authService.getProfile().subscribe({
      next: (res) => {
        this.user = res.data.user;
      },
      error: (error) => {
        console.log(error);
        
      }
    })
  }

  logoutUser() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.user = undefined;
    this.router.navigateByUrl('/login-signup');
  }

  searchSubmit(formData: NgForm) {
    this.router.navigateByUrl(
      '/admin/search_results/' + formData.value.stud_search
    );
  }
}
