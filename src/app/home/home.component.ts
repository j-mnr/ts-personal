import { Component, OnInit } from '@angular/core';
import { HomeHeaderServiceService } from '../home-header-service/home-header-service.service';
import { SearchService } from '../home-header-service/search.service';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public filterName!: string;

  constructor(
    private homeHeaderService: HomeHeaderServiceService,
    private searchService: SearchService
  ) {
    this.homeHeaderService.functionCalled$.subscribe((value: string) => {
      const carousels = document.querySelectorAll(
        '.carousel-container'
      ) as NodeListOf<HTMLElement>;

      carousels.forEach(function (carousel) {
        carousel.style.display = 'none';
      });

      if (value == 'all') {
        carousels.forEach(function (carousel) {
          carousel.style.display = 'block';
        });
      } else {
        const category = document.getElementById(value);
        if (category) {
          category.style.display = 'block';
        }
      }
    }); // End subscribe

    this.searchService.functionCalled$.subscribe((value: string) => {
      this.filterName = value;
    });
  } // End Constructor

  productTitles = [
    { endpoint: 'cpu', title: 'CPUs' },

    { endpoint: 'videocard', title: 'Video Cards' },

    { endpoint: 'computercase', title: 'Computer Cases' },

    { endpoint: 'ram', title: 'RAM' },

    { endpoint: 'motherboard', title: 'Motherboards' },

    { endpoint: 'ssd', title: 'Solid State Drives' },

    { endpoint: 'hdd', title: 'Hard Disk Drives' },

    { endpoint: 'powersupply', title: 'Power Supplies' },
  ];

  ngOnInit() {}
}
