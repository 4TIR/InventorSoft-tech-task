import { Component } from '@angular/core';
import {MENU_ITEMS} from "./shared/menu/menu-items";
import {AuthService} from "../auth/services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  menuItems = MENU_ITEMS;

  constructor(private authService: AuthService) { }
  logout() {
    this.authService.logout();
  }
}
