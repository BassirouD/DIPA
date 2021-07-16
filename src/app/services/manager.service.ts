import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  //host:String="http://mysterious-island-44061.herokuapp.com/";
  //host:String="https://orbus-preprod.gainde2000.sn:8080/apidipa/";
  host=environment.api;

  constructor(private http:HttpClient) { }

  listJoindres(annee):Observable<any>{
    return this.http.get(this.host+'joindres/'+annee);
  }

  listJoindre2Months(annee1,annee2):Observable<any>{
     return this.http.get(this.host+'joindresannee/'+annee1+'/'+annee2);
  }

  listCaracteriserByMonthByYEAR(annee):Observable<any>{
    return this.http.get(this.host+'listarticleByMont/'+annee);
  }

  sommesArticleByMonthYear(annee):Observable<any>{
    return this.http.get(this.host+'sommePrixTotal/'+annee);
  }

  listImportateurs(periode,annee):Observable<any>{
    return this.http.get(this.host+'importateurs/'+periode+'/'+annee);
  }

  listPaysOrigin(annee,periode):Observable<any>{
    return this.http.get(this.host+'paysorigin/'+annee+'/'+periode);
  }

  volumeByProduct(hcode,annee):Observable<any>{
    return this.http.get(this.host+'listprixbyHcode/'+hcode+'/'+annee);
  }

  prixTwoYears(annee1,annee2):Observable<any>{
    return this.http.get(this.host+'prixTwoyears/'+annee1+'/'+annee2);
  }
  dipastraites(annee):Observable<any>{
    return this.http.get(this.host+'dipatraites/'+annee);
  }

  listDemandesByHCode(annee,hcode):Observable<any>{
    return this.http.get(this.host+'listDemandesNumeroTarif/'+hcode+'/'+annee);
  }

  listDemandeHcodeTraites(annee,hcode):Observable<any>{
    return this.http.get(this.host+'listDemandesNumeroTariftraite/'+hcode+'/'+annee);
  }

  listtendances(annee1,annee2):Observable<any>{
    return this.http.get(this.host+'tendanceannee/'+annee1+'/'+annee2);
  }

  listdemandedouanetraitebyhcode(annee,hcode):Observable<any>{
    return this.http.get(this.host+'listDemandesmonthbyhcode/'+hcode+'/'+annee);
  }

  listdemandedouane1byhcode(annee,hcode):Observable<any>{
    return this.http.get(this.host+'listDemandesdouanemonthbyhcode/'+hcode+'/'+annee);
  }

  listprixdipabyhcode(annee,hcode):Observable<any>{
    return this.http.get(this.host+'listmonthbyhcode/'+hcode+'/'+annee);
  }

  volumeByProduct1(hcode,annee):Observable<any>{
    return this.http.get(this.host+'listmonthbyhcode/'+hcode+'/'+annee);
  }
  beneficiaire(periode,annee):Observable<any>{
    return this.http.get(this.host+'beneficiaires'+'/'+periode+'/'+annee);
  }

}

