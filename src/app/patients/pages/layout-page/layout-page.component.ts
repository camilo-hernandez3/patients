import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent implements OnInit {

  public sidebarItems = [
    {label: 'Listado', icon: 'label', url:'./list'},
    {label: 'Añadir', icon: 'add', url:'./new-patient'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
