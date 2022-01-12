import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppDataLayerService } from '../app-data-layer.service';
import { AuthService } from '../auth/shared/auth.service';
import { HomeHeaderServiceService } from '../home-header-service/home-header-service.service';
import { SearchService } from '../home-header-service/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn!: boolean;
  username!: string;
  isChecked: boolean = false;
  @Input() cartItemTotal!: number;

  @ViewChild('selectOption') selectOption: any;
  @ViewChild('searchBox') searchBox: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private homeHeaderService: HomeHeaderServiceService,
    private searchService: SearchService,
    private localProductService: AppDataLayerService
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) this.resetSearch();
    });
  }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data: boolean) => {
      this.isLoggedIn = data;
    });
    this.authService.username.subscribe((data: string) => {
      this.username = data;
    });
    this.localProductService.cartItemTotal.subscribe((resolve: number) => {
      this.cartItemTotal = resolve;
    });
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUsername();
    this.localProductService.cartItemTotal.subscribe((resolve: number) => {
      this.cartItemTotal = resolve;
    });
    if (this.localProductService.localProducts != null) {
      this.cartItemTotal = this.localProductService.localProducts.length;
    } else this.cartItemTotal = 0;
  }

  resetSearch() {
    if (this.selectOption !== undefined) {
      this.selectOption.nativeElement.value = 'all';
      this.searchBox.nativeElement.value = '';
    }
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.username = '';
    this.router.navigateByUrl('');
  }

  updateCarousels() {
    let option: string = this.selectOption.nativeElement.value;
    if (option == 'all') {
      this.searchBox.nativeElement.value = '';
      this.searchCarousel();
    }
    this.homeHeaderService.updateCarousels(option);
  }

  searchCarousel() {
    let searchItem = this.searchBox.nativeElement.value;
    this.searchService.searchCarousels(searchItem);
  }
}
