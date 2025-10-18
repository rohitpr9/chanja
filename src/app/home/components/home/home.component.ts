import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { CommonModule, isPlatformBrowser, NgIf } from "@angular/common";
import { LoginComponent } from '../../../core/admin.components/login/login.component';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListComponent, LoginComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  isLogin: boolean = false;



  constructor(private _sharedService: ServicesService, @Inject(PLATFORM_ID) private platformId: object) {

  }

  ngOnInit(): void {
    this._sharedService.returnLoginValue().subscribe(isLogged => {
      this.isLogin = isLogged
    })

    if (isPlatformBrowser(this.platformId)) {
      const isAdmin = sessionStorage.getItem('Admin');
      this.isLogin = Boolean(isAdmin)
    }
  }
}
