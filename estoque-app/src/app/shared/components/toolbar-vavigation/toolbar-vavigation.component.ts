import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-toolbar-vavigation',
  templateUrl: './toolbar-vavigation.component.html',
  styleUrls: []
})
export class ToolbarVavigationComponent {

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) {}

logout() {
  this.cookieService.delete('USER_INFO');
  void this.router.navigate(['/home']);
}

}
