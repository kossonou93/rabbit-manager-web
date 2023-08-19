import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullContentComponent } from './full-content/full-content.component';
import { full_content } from './routes/full-content-route';
import { CustomContentComponent } from './custom-content/custom-content.component';
import { custom_content } from './routes/custom-content-route';
import { LoginComponent } from './protected/login/login.component';
import { AuthGuard } from './protected/services/auth.guard';

const routes: Routes = [
  {path: 'auth/login', component: LoginComponent},
  //{path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  {path: '', component: FullContentComponent, children: full_content, canActivate: [AuthGuard]},
  {path: '', component: CustomContentComponent, children: custom_content, canActivate: [AuthGuard]},
  //{path: '', loadChildren: ()=> import('./shared/shared.module').then(m=>m.SharedModule)},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
