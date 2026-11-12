import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Adherent } from '../model/adherent.model';
import { AdherentService } from '../services/adherent.service';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-adherents',
  imports: [DatePipe, RouterLink],
  templateUrl: './adherents.component.html',
})
export class AdherentsComponent implements OnInit {
  adherents: Adherent[] = [];
  private adherentService = inject(AdherentService);
  private cdr = inject(ChangeDetectorRef);
  authService = inject(Auth);

  ngOnInit(): void {
    this.chargerAdherents();
  }

  chargerAdherents() {
    this.adherentService.listeAdherents().subscribe((adhs) => {
      this.adherents = adhs;
      this.cdr.markForCheck();
    });
  }

  supprimerAdherent(v: Adherent) {
    const conf = confirm('Êtes-vous sûr de vouloir supprimer cet adhérent ?');
    if (conf) {
      this.adherentService.supprimerAdherent(v.idAdherent).subscribe(() => {
        this.chargerAdherents();
      });
    }
  }
}
