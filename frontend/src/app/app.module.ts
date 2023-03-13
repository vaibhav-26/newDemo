import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/layout/header/header.component";
import { SeatingArrangementComponent } from "./pages/seating-arrangement/seating-arrangement.component";
import { AddRequestComponent } from "./pages/seating-arrangement/add-request/add-request.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { LoginComponent } from "./pages/login/login.component";
import { ToastService, AngularToastifyModule } from "angular-toastify";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { MatDividerModule } from "@angular/material/divider";
import { SidebarComponent } from "./components/layout/sidebar/sidebar.component";
import { AppLayoutComponent } from "./components/layout/app-layout/app-layout.component";
import { LayoutModule } from "./components/layout/layout.module";
import { UserComponent } from "./pages/user/user.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { HttpClientModule } from "@angular/common/http";
import { RequestsComponent } from "./pages/requests/requests.component";
import { TableComponent } from "./components/table/table.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MFAComponent } from "./pages/mfa/mfa.component";
import { ForgotPasswordComponent } from "./pages/forgot-password/forgot-password.component";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { ResetPasswordComponent } from "./pages/reset-password/reset-password.component";
import { ProjectComponent } from "./pages/project/project.component";
import { AddProjectComponent } from "./pages/project/add-project/add-project.component";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SeatingArrangementComponent,
    AddRequestComponent,
    DashboardComponent,
    MFAComponent,
    ForgotPasswordComponent,
    UserComponent,
    RequestsComponent,
    TableComponent,
    ResetPasswordComponent,
    ProjectComponent,
    AddProjectComponent,
  ],
  imports: [
    HttpClientModule,
    MatCardModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    AngularToastifyModule,
    LayoutModule,
    MatPaginatorModule,
    MatTableModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    TooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule,
  ],
  providers: [ToastService],
  bootstrap: [AppComponent],
})
export class AppModule {}
