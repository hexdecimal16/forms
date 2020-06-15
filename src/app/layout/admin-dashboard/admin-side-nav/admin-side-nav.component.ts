import { Component, OnInit } from '@angular/core';
import { AuthorisedSideNavService } from '../../profile/services/side-nav.service';

@Component({
  selector: 'app-admin-side-nav',
  templateUrl: './admin-side-nav.component.html',
  styleUrls: ['./admin-side-nav.component.css']
})
export class AdminSideNavComponent implements OnInit {
  select = 0;

  constructor(public sideNavService: AuthorisedSideNavService) { }

  ngOnInit(): void {
  }

}
