
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  NgZone,
  OnDestroy,
  OnInit
} from '@angular/core';

import { SeoService } from './seo.service';
import { MotionKit, MotionService } from '@app/shared/motion.service';
import { animateCards, flipCard } from '@app/shared/card-motion';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly jsonLdId = 'services';
  private kit: MotionKit | null = null;
  private stopMotion?: () => void;
  private destroyed = false;

  @HostBinding('class.gsap-ready') gsapReady = false;

  constructor(
    private seo: SeoService,
    private motion: MotionService,
    private zone: NgZone,
    private host: ElementRef<HTMLElement>
  ) {}

  services = [
    {
      number: '01',
      title: 'Programação',
      description: 'Estou desenvolvendo meus conhecimentos em programação, aprendendo a criar algoritmos, resolver problemas e construir soluções por meio do código.',
      icon: [
        'M8 17l-5-5 5-5',
        'M16 7l5 5-5 5',
        'M14 4l-4 16'
      ],
      flipped: false
    },
    {
      number: '02',
      title: 'Lógica Computacional',
      description: 'Estudo raciocínio lógico, estruturas de pensamento e fundamentos que ajudam a compreender e resolver problemas computacionais.',
      icon: [
        'M12 3v4',
        'M5.6 5.6l2.8 2.8',
        'M3 12h4',
        'M12 17v4',
        'M17 12h4',
        'M16 8l3-3',
        'M9 12h6'
      ],
      flipped: false
    },
    {
      number: '03',
      title: 'Desenvolvimento Web',
      description: 'Tenho interesse em aprender a desenvolver páginas e aplicações web, explorando HTML, CSS, TypeScript e Angular por meio de projetos práticos.',
      icon: [
        'M3 4h18v16H3z',
        'M3 9h18',
        'M10 12l-3 3 3 3',
        'M14 12l3 3-3 3'
      ],
      flipped: false
    },
    {
      number: '04',
      title: 'Sistemas de Informação',
      description: 'Na graduação, estudo como tecnologia, pessoas, processos e informações se relacionam para apoiar organizações e solucionar problemas.',
      icon: [
        'M4 4h16v16H4z',
        'M4 10h16',
        'M10 10v10',
        'M14 14h3',
        'M14 17h3'
      ],
      flipped: false
    },
    {
      number: '05',
      title: 'Matemática e Estatística',
      description: 'Exploro conceitos matemáticos e estatísticos importantes para desenvolver o raciocínio analítico e compreender informações.',
      icon: [
        'M3 3v18h18',
        'M7 15l4-5 3 3 5-7',
        'M7 7h.01'
      ],
      flipped: false
    },
    {
      number: '06',
      title: 'Banco de Dados',
      description: 'Tenho interesse em compreender como os dados são armazenados, organizados e utilizados em sistemas e aplicações.',
      icon: [
        'M4 6c0-4 16-4 16 0s-16 4-16 0z',
        'M4 6v12c0 4 16 4 16 0V6',
        'M4 12c0 4 16 4 16 0'
      ],
      flipped: false
    },
    {
      number: '07',
      title: 'Algoritmos',
      description: 'Busco desenvolver minha capacidade de analisar problemas, organizar etapas e criar soluções lógicas e eficientes.',
      icon: [
        'M8 3h8v5H8z',
        'M8 16h8v5H8z',
        'M12 8v8',
        'M9 12l3 3 3-3'
      ],
      flipped: false
    },
    {
      number: '08',
      title: 'Projetos e Criatividade',
      description: 'Gosto de transformar ideias em experiências práticas, experimentar ferramentas e aprender com os desafios de cada projeto.',
      icon: [
        'M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z'
      ],
      flipped: false
    }
  ];

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.motion.load().then((kit) => {
        if (!kit || this.destroyed) {
          return;
        }

        this.kit = kit;

        this.stopMotion = animateCards(
          kit,
          this.host.nativeElement,
          { cards: '.card', icon: '.card-icon' }
        );

        this.zone.run(() => (this.gsapReady = true));
      });
    });
  }

  toggle(service: { flipped: boolean }, event: Event): void {
    service.flipped = !service.flipped;

    const card = (event.currentTarget as HTMLElement)
      .closest<HTMLElement>('.card');

    if (this.kit && card) {
      const kit = this.kit;

      this.zone.runOutsideAngular(() =>
        flipCard(kit, card, service.flipped)
      );
    }
  }

  ngOnInit(): void {
    this.seo.setJsonLd(this.jsonLdId, {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Conhecimentos de João Paulo Guilherme Silva',
      itemListElement: this.services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Thing',
          name: service.title,
          description: service.description
        }
      }))
    });
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.stopMotion?.();
    this.seo.removeJsonLd(this.jsonLdId);
  }
}
