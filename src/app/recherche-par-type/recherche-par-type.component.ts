import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Adherent } from '../model/adherent.model';
import { TypeAbonnement } from '../model/type-abonnement.model';
import { AdherentService } from '../services/adherent.service';

@Component({
  selector: 'app-recherche-par-type',
  imports: [FormsModule, CommonModule],
  templateUrl: './recherche-par-type.component.html',
})
export class RechercheParTypeComponent implements OnInit {
  adherents: Adherent[] = [];
  IdType!: number;
  types: TypeAbonnement[] = [];
  private adherentService = inject(AdherentService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.adherentService.listeTypes().subscribe((res) => {
      this.types = res._embedded.types;
      this.cdr.markForCheck();
    });
  }

  onChange() {
    this.adherentService.rechercherParType(this.IdType).subscribe((adhs) => {
      this.adherents = adhs;
      this.cdr.markForCheck();
    });
  }
}
