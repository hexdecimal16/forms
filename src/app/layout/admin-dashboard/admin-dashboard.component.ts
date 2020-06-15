import { Component, OnInit } from '@angular/core';
import { AuthorisedSideNavService } from '../../layout/profile/services/side-nav.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  dashboard = '';
  settings = 'd-none';

  constructor(public sideNavService: AuthorisedSideNavService) { }

  ngOnInit(): void {
  }

  changePage(num: number) {
    console.log(num)
    if (num == 0) {
      this.dashboard = '';
      this.settings = 'd-none';
    
    } else {
      this.dashboard = 'd-none';
      this.settings = '';
    
    }
  }

}
