import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { HeaderModule } from '../header/header.module';
import { SidenavComponent } from './sidenav.component';

@NgModule({
  declarations: [SidenavComponent],
  exports: [SidenavComponent],
  imports: [CommonModule, MatSidenavModule, HeaderModule, MatIconModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SidenavModule {}
