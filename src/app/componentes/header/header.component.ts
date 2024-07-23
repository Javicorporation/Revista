import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  // el titulo que se asigan en el header
  // variable String titulo
  @Input() titulo: string= ''

  constructor() { }

  ngOnInit() {}

}
