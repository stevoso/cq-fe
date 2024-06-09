import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CollapsibleMenuComponent} from "./components/collapsible-menu/collapsible-menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CollapsibleMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';
}
