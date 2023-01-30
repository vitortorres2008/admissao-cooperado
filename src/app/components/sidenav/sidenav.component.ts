import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  opened: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  handleOpen() {
    this.opened = !this.opened;
  }
}
