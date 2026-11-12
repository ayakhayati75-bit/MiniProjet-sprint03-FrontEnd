import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adherent } from '../model/adherent.model';
import { TypeAbonnement } from '../model/type-abonnement.model';
import { TypeAbonnementWrapper } from '../model/type-abonnement-wrapper.model';

@Injectable({ providedIn: 'root' })
export class AdherentService {
  // api REST Spring Boot (@RestController) pour les adhérents
  apiURL: string = 'http://localhost:8090/adherents/api';
  // api Spring Data REST pour les types d'abonnement
  apiURLType: string = 'http://localhost:8090/adherents/types';

  private http = inject(HttpClient);

  // ---------- Adhérents ----------
  listeAdherents(): Observable<Adherent[]> {
    return this.http.get<Adherent[]>(this.apiURL);
  }

  ajouterAdherent(adherent: Adherent): Observable<Adherent> {
    return this.http.post<Adherent>(this.apiURL, adherent);
  }

  supprimerAdherent(id: number) {
    return this.http.delete(this.apiURL + '/' + id);
  }

  consulterAdherent(id: number): Observable<Adherent> {
    return this.http.get<Adherent>(this.apiURL + '/' + id);
  }

  updateAdherent(adherent: Adherent): Observable<Adherent> {
    return this.http.put<Adherent>(this.apiURL, adherent);
  }

  rechercherParType(idType: number): Observable<Adherent[]> {
    return this.http.get<Adherent[]>(this.apiURL + '/adhtype/' + idType);
  }

  // Recherche par nom
  rechercherParNom(nom: string): Observable<Adherent[]> {
    return this.http.get<Adherent[]>(this.apiURL + '/adhsByName/' + nom);
  }

  //  Types d'abonnement (Spring Data REST) 
  listeTypes(): Observable<TypeAbonnementWrapper> {
    return this.http.get<TypeAbonnementWrapper>(this.apiURLType);
  }

  ajouterType(type: TypeAbonnement): Observable<TypeAbonnement> {
    // l'id est généré par MySQL : on envoie seulement le nom
    return this.http.post<TypeAbonnement>(this.apiURLType, { nomType: type.nomType });
  }

  updateType(type: TypeAbonnement): Observable<TypeAbonnement> {
    return this.http.put<TypeAbonnement>(this.apiURLType + '/' + type.idType, type);
  }

  supprimerType(id: number) {
    return this.http.delete(this.apiURLType + '/' + id);
  }
}
