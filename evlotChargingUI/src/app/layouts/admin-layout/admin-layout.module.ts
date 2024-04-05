import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { VehiclesComponent } from 'app/vehicles/vehicles.component';
import { SearchComponent } from 'app/search/search.component';
import { PortsComponent } from 'app/ports/ports.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SlotsComponent } from 'app/slots/slots.component';
import { ThanksComponent } from 'app/thankyou/thanks.component';
import { BookingsComponent } from 'app/bookings/bookings.component';
import { AboutComponent } from 'app/aboutus/about.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    ReactiveFormsModule,
    FormsModule,
    LbdModule,
    HttpClientModule,
    //SearchComponent,
    MatFormFieldModule,
    MatInputModule, MatDatepickerModule,MatNativeDateModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})
  ],
  declarations: [
    HomeComponent,
    UserComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    VehiclesComponent,
    SearchComponent,
    PortsComponent,
    SlotsComponent,
    ThanksComponent,
    BookingsComponent,
    AboutComponent
  ]
})

export class AdminLayoutModule {}
