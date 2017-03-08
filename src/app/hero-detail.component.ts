import { Component, Input, OnInit } from "@angular/core";
import { Hero } from "./hero";
import { HeroService } from "./hero.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  moduleId: module.id,
  selector: 'esc-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  @Input()
  hero: Hero;

  constructor(private heroService: HeroService, private route: ActivatedRoute, private location: Location) {
  }

  ngOnInit(): void {
    // this.route.params(switchMap((params: Params) => this.heroService.getHero(+params['id'])))
    //     .subscribe(hero => this.hero = hero);

    this.route.params
        .forEach((params: Params) => {
          if (params['id'] !== undefined) {
            let id = +params['id'];

            this.heroService.getHero(id).then(hero => this.hero = hero);
          }
        }).then();
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.update(this.hero).then(() => this.goBack());
  }
}
