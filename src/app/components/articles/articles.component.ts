import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
})
export class ArticlesComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = true;
  filterForm: FormGroup;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      search: [''],
      maxPrice: [''],
      promotionOnly: [false],
    });
  }

  ngOnInit() {
    this.loadProducts();
    this.setupFilters();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products = products;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des produits:', error);
        this.loading = false;
      },
    });
  }

  setupFilters() {
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  applyFilters() {
    const filters = this.filterForm.value;

    this.filteredProducts = this.products.filter((product) => {
      // Search filter
      if (filters.search && filters.search.trim() !== '') {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch =
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm);
        if (!matchesSearch) return false;
      }

      // Price filter
      if (filters.maxPrice && filters.maxPrice > 0) {
        const effectivePrice =
          product.discountPercent > 0
            ? this.getDiscountedPrice(product)
            : product.fullPrice;
        if (effectivePrice > filters.maxPrice) return false;
      }

      // Promotion filter
      if (filters.promotionOnly && product.discountPercent === 0) {
        return false;
      }

      return true;
    });
  }

  getDiscountedPrice(product: Product): number {
    return product.fullPrice * (1 - product.discountPercent);
  }

  resetFilters() {
    this.filterForm.reset({
      search: '',
      maxPrice: '',
      promotionOnly: false,
    });
  }
}
