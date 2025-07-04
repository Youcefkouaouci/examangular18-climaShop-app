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
  products: Product[] = []; //Liste Liste complète des produits
  filteredProducts: Product[] = []; // Liste des produits filtrés pour l'affichage
  loading = true;
  filterForm: FormGroup; // Formulaire  pour les filtres

  // Constructeur : injection des dépendances
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

  // Méthode appelée après l'initialisation du composant (Charge les produits au démarrage et Configure les filtres)

  ngOnInit() {
    this.loadProducts();
    this.setupFilters();
  }

  // Méthode pour charger les produits depuis le service
  loadProducts() {
    this.loading = true; // Active l'indicateur de chargement

    // Appel du service pour récupérer tous les produits
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products = products; // Stocke les produits
        this.applyFilters(); // Applique les filtres
        this.loading = false; // Désactive l'indicateur de chargement
      },
      // Fonction appelée en cas d'erreur
      error: (error) => {
        console.error('Erreur lors du chargement des produits:', error);
        this.loading = false;
      },
    });
  }

  // Méthode pour configurer  des filtres
  setupFilters() {
    // return observable = qui écoute les changements dans le formulaire de filtre
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters(); // Applique les filtres à chaque changement
    });
  }

  // Méthode principale pour appliquer les filtres aux produits
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
        // Calcule le prix effectif (avec réduction si applicable)
        const effectivePrice =
          product.discountPercent > 0
            ? this.getDiscountedPrice(product)
            : product.fullPrice;
        if (effectivePrice > filters.maxPrice) return false;
      }

      // Promotion filter
      // // Filtre pour afficher uniquement les promotions
      if (filters.promotionOnly && product.discountPercent === 0) {
        return false;
      }

      return true;
    });
  }

  // Méthode utilitaire pour calculer le prix avec réduction
  getDiscountedPrice(product: Product): number {
    return product.fullPrice * (1 - product.discountPercent);
  }
  // Méthode pour réinitialiser tous les filtres
  resetFilters() {
    this.filterForm.reset({
      search: '',
      maxPrice: '',
      promotionOnly: false,
    });
  }
}
