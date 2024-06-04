import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isScrolled: boolean = false;
  isLoggedIn: boolean = false;
  user: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to changes in the current user
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
      this.isLoggedIn = !!user; // Update isLoggedIn based on user data
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  logoutUser() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.user = undefined;
    this.router.navigateByUrl('/login-signup');
  }
}
