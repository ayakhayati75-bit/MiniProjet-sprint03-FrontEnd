import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Adherent } from '../model/adherent.model';
import { TypeAbonnement } from '../model/type-abonnement.model';
import { AdherentService } from '../services/adherent.service';

@Component({
  selector: 'app-update-adherent',
  imports: [FormsModule, DatePipe],
  templateUrl: './update-adherent.component.html',
})
export class UpdateAdherentComponent implements OnInit {
  currentAdherent = new Adherent();
  types: TypeAbonnement[] = [];
  updatedIdType!: number;
  private activatedRoute = inject(ActivatedRoute);
  private adherentService = inject(AdherentService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  ngOnInit() {
    this.adherentService.listeTypes().subscribe((res) => {
      this.types = res._embedded.types;
      this.cdr.markForCheck();
    });

    const id = Number(this.activatedRoute.snapshot.params['id']);
    this.adherentService.consulterAdherent(id).subscribe((adh) => {
      this.currentAdherent = adh;
      this.updatedIdType = adh.typeAbonnement.idType;
      this.cdr.markForCheck();
    });
  }

  updateAdherent() {
    this.currentAdherent.typeAbonnement = this.types.find((t) => t.idType == this.updatedIdType)!;
    this.adherentService.updateAdherent(this.currentAdherent).subscribe(() => {
      this.router.navigate(['adherents']);
    });
  }
}
