import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { TypeAbonnement } from '../model/type-abonnement.model';
import { AdherentService } from '../services/adherent.service';
import { UpdateTypeComponent } from '../update-type/update-type.component';

@Component({
  selector: 'app-liste-types',
  imports: [UpdateTypeComponent],
  templateUrl: './liste-types.component.html',
})
export class ListeTypesComponent implements OnInit {
  types: TypeAbonnement[] = [];
  updatedType: TypeAbonnement = { idType: 0, nomType: '' };
  ajout: boolean = true;

  private adherentService = inject(AdherentService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.chargerTypes();
  }

  chargerTypes() {
    this.adherentService.listeTypes().subscribe((res) => {
      this.types = res._embedded.types;
      this.cdr.markForCheck();
    });
  }

  // événement reçu de l'enfant UpdateType
  typeUpdated(type: TypeAbonnement) {
    const requete = this.ajout
      ? this.adherentService.ajouterType(type)
      : this.adherentService.updateType(type);

    requete.subscribe(() => {
      // on remet le formulaire en mode "ajout"
      this.updatedType = { idType: 0, nomType: '' };
      this.ajout = true;
      this.cdr.markForCheck();
      this.chargerTypes();
    });
  }

  updateType(type: TypeAbonnement) {
    // copie : la table ne change qu'après clic sur "Modifier"
    this.updatedType = { ...type };
    this.ajout = false;
  }

  supprimerType(type: TypeAbonnement) {
    const conf = confirm('Êtes-vous sûr de vouloir supprimer ce type ?');
    if (conf) {
      this.adherentService.supprimerType(type.idType).subscribe({
        next: () => this.chargerTypes(),
        error: () =>
          alert('Suppression impossible : ce type est utilisé par des adhérents.'),
      });
    }
  }
}
