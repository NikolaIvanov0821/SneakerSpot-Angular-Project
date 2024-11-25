import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../types/product';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {
  
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getProducts().subscribe((p) => {
      console.log(p);
    })
  }
}
