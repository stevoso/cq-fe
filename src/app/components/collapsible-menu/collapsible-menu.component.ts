import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-collapsible-menu',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './collapsible-menu.component.html',
  styleUrl: './collapsible-menu.component.css'
})
export class CollapsibleMenuComponent {

}
