
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LinksComponent } from './links/links.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    data: {
      seo: {
        title: 'João Paulo | Meu Portfólio',
        description:
          'Portfólio pessoal de João Paulo Guilherme Silva, estudante de Sistemas de Informação na UTFPR, Campus Curitiba.',
      },
    },
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      seo: {
        title: 'Sobre Mim | João Paulo',
        description:
          'Conheça minha trajetória acadêmica, meus interesses, hobbies e experiências pessoais.',
      },
    },
  },
  {
    path: 'services',
    component: ServicesComponent,
    data: {
      seo: {
        title: 'Conhecimentos | João Paulo',
        description:
          'Conheça meus estudos, conhecimentos e interesses em programação, tecnologia e Sistemas de Informação.',
      },
    },
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: {
      seo: {
        title: 'Contato | João Paulo',
        description:
          'Entre em contato para trocar ideias sobre tecnologia, aprendizado, projetos e novas oportunidades.',
      },
    },
  },
  {
    path: 'links',
    component: LinksComponent,
    data: {
      standalone: true,
      seo: {
        title: 'Meus Links | João Paulo',
        description:
          'Conheça meus links e redes sociais.',
        noindex: true,
      },
    },
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {
      seo: {
        title: 'Página não encontrada | João Paulo',
        description:
          'A página que você procura não existe ou foi movida.',
        noindex: true,
      },
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
      useHash: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
