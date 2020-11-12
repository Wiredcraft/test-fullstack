import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateLightningTalkComponent } from './components/create-lightning-talk/create-lightning-talk.component';
import { LightningTalkDetailComponent } from './components/lightning-talk-detail/lightning-talk-detail.component';
import { LightningTalksListComponent } from './components/lightning-talks-list/lightning-talks-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'lightningtalks', component: LightningTalksListComponent },
  { path: 'lightningtalks/:id', component: LightningTalkDetailComponent },
  { path: 'create', component: CreateLightningTalkComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // otherwise redirect
  { path: '**', redirectTo: 'lightningtalks' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
