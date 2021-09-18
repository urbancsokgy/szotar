import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(    private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }
  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
}

}
