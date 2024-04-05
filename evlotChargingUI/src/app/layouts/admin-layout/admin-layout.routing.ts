import { Routes } from '@angular/router';

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
import { SlotsComponent } from 'app/slots/slots.component';
import { ThanksComponent } from 'app/thankyou/thanks.component';
import { BookingsComponent } from 'app/bookings/bookings.component';
import { AboutComponent } from 'app/aboutus/about.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TablesComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'vehicles',        component: VehiclesComponent },
    { path: 'search',        component: SearchComponent },
    { path: 'ports',        component: PortsComponent },
    { path: 'slots',        component: SlotsComponent },
    { path: 'confirmation',        component: ThanksComponent },
    { path: 'bookings',        component: BookingsComponent },
    { path: 'contactus',        component: AboutComponent },
    
];
