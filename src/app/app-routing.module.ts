import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo:'calender',
    pathMatch:'full'
  },
  {
    path: 'calender',
    loadChildren: () => import('./feature-modules/calendar/calendar.module').then((c) => c.CalendarModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
