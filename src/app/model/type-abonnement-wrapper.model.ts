import { TypeAbonnement } from './type-abonnement.model';

// Format retourné par Spring Data REST : { _embedded: { types: [...] } }
export class TypeAbonnementWrapper {
  _embedded!: { types: TypeAbonnement[] };
}
