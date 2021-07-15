import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'change-profil',
    loadChildren: () => import('./pages/change-profil/change-profil.module').then( m => m.ChangeProfilPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./pages/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'etat-global-dossier',
    loadChildren: () => import('./pages-dossiers/etat-global-dossier/etat-global-dossier.module').then( m => m.EtatGlobalDossierPageModule)
  },
  {
    path: 'performance-comparee',
    loadChildren: () => import('./pages-dossiers/performance-comparee/performance-comparee.module').then( m => m.PerformanceCompareePageModule)
  },
  {
    path: 'demandes-traitees-articles',
    loadChildren: () => import('./pages-dossiers/demandes-traitees-articles/demandes-traitees-articles.module').then( m => m.DemandesTraiteesArticlesPageModule)
  },
  {
    path: 'estimation-import-mois',
    loadChildren: () => import('./pages-dossiers/estimation-import-mois/estimation-import-mois.module').then( m => m.EstimationImportMoisPageModule)
  },
  {
    path: 'estimation-import-article',
    loadChildren: () => import('./pages-dossiers/estimation-import-article/estimation-import-article.module').then( m => m.EstimationImportArticlePageModule)
  },
  {
    path: 'tendance-evolution-mois',
    loadChildren: () => import('./pages-dossiers/tendance-evolution-mois/tendance-evolution-mois.module').then( m => m.TendanceEvolutionMoisPageModule)
  },  {
    path: 'tendancemodal',
    loadChildren: () => import('./modals/tendancemodal/tendancemodal.module').then( m => m.TendancemodalPageModule)
  },
  {
    path: 'classementlongmodal',
    loadChildren: () => import('./modals/classementlongmodal/classementlongmodal.module').then( m => m.ClassementlongmodalPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
