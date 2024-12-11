import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { RouterLink } from '@angular/router';
import { Product } from '../types/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  currentSlide = 0;
  products: Product[] = [];
  featuredProducts: Product[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getProducts().subscribe((data) => {
      this.products = data
      this.featuredProducts = [
        this.products[1],
        this.products[4],
        this.products[10]
      ];
    })
  }

  slides = [
    {
      image: "sneakerwall.png", // Replace with actual image URL
      altText: 'Shop Now',
      link: '/products',
    },
    {
      image: 'https://via.placeholder.com/1200x400?text=New+Arrival+1', // Replace with actual image URL
      altText: 'New Arrival 1',
      link: '/products/6745e8f2ceba93ab8cd18d55',
    },
    {
      image: 'https://via.placeholder.com/1200x400?text=New+Arrival+2', // Replace with actual image URL
      altText: 'New Arrival 2',
      link: '/products/6745ec34ceba93ab8cd18d59',
    },
    {
      image: 'https://via.placeholder.com/1200x400?text=Exclusive+Offer', // Replace with actual image URL
      altText: 'Exclusive Offer',
      link: '/products/6745ee12ceba93ab8cd18d61',
    },
  ];

  

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
}
