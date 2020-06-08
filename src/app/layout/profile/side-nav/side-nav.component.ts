import { Component, OnInit } from '@angular/core';
import { AuthorisedSideNavService } from '../services/side-nav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(public sideNavService: AuthorisedSideNavService) { }

  ngOnInit(): void {
  }

}
