import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Adherent } from '../model/adherent.model';
import { TypeAbonnement } from '../model/type-abonnement.model';
import { AdherentService } from '../services/adherent.service';

@Component({
  selector: 'app-add-adherent',
  imports: [FormsModule],
  templateUrl: './add-adherent.component.html',
})
export class AddAdherentComponent implements OnInit {
  newAdherent = new Adherent();
  types: TypeAbonnement[] = [];
  newIdType!: number;
  private adherentService = inject(AdherentService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  ngOnInit(): void {
    this.adherentService.listeTypes().subscribe((res) => {
      this.types = res._embedded.types;
      if (this.types.length > 0) this.newIdType = this.types[0].idType;
      this.cdr.markForCheck();
    });
  }

  addAdherent() {
    this.newAdherent.typeAbonnement = this.types.find((t) => t.idType == this.newIdType)!;
    this.adherentService.ajouterAdherent(this.newAdherent).subscribe(() => {
      this.router.navigate(['adherents']);
    });
  }
}
