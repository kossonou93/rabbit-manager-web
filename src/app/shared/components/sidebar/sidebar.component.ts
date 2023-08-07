import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/protected/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router){
  }

  ngOnInit(): void {
    
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
