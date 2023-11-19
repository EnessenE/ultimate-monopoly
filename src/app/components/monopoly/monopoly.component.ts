import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-monopoly',
  templateUrl: './monopoly.component.html',
  styleUrls: ['./monopoly.component.scss']
})
export class MonopolyComponent implements OnInit {
  Math = Math;
  allCardsNames: string[] = ['eight mile road', 'galveston street', 'lake shore drive.', 'delancey street', 'gratiot avenue', 'kirby drive.', 'wacker drive.', 'walnut street', 'telegraph road', 'cullen boulevard.', 'cass avenue', 'michigan avenue', 'market street', 'piedmont park', 'south temple', 'title deed', 'katy freeway', 'pritzker pavilion', 'south street', 'woodward avenue', 'westheimer road', 'randolph street', 'broad street', 'temple square', 'decatur street', 'north temple', 'rodeo drive.', 'peachtree street', 'dekalb avenue', 'east temple', 'riverside drive.', 'andrew young intl boulevard.', 'west temple', 'ventura boulevard.', 'jackson square', 'lake shore driveive', 'kirby driveive', 'wacker driveive', 'pt telegraph', 'cullen boulevard', 'et michigan', 'pt esplanade', 'eet mulholland', 'riverside driveive', 'canal street', 'andrew young intl boulevard', 'ventura boulevard', 'magazine street', 'rodeo driveive', 'ct bourbon', 'states avenue', 'marvin gardens', 'new jersey avenue', 'new york avenue', 'kentucky avenue', 'mediterranean avenue', 'indiana avenue', 'street charles place', 'illinois avenue', 'park place', 'virginia avenue', 'ventnor avenue', 'baltic avenue', 'street james place', 'california avenue', 'arctic avenue', 'tennessee avenue', 'boardwalk', 'arkansas avenue', 'ohio avenue', 'maryland avenue', 'atlantic avenue', 'ocean drive.', 'pasadena boulevard.', 'newbury street', 'biscayne avenue', 'fishermans wharf', 'fenway park', 'florida avenue', 'lombard street', 'beacon street', 'miami avenue', 'the embarcadero', 'boylston street', 'oriental avenue', 'pacific avenue', 'vermont avenue', 'north carolina avenue', 'massachusetts avenue', 'pennsylvania avenue', 'connecticut avenue', 'south carolina avenue', 'wall street', 'ocean driveive', 'pasadena boulevard', 'central park', 'fisher mans wharf', 'fifth avenue', 'madison avenue', 'wataga avenue', 'unaka avenue', 'john exum parkway', 'gator bowl boulevard', 'roan street', 'five points', 'laura street', 'ponte vedra boulevard', 'd', 'red monorail', 'jersey central', 'pennsylvania', 'atlantic railroad', 'los angeles', 'delta basin', 'held', 'yellow monorail', 'west jersey railroad', 'short line', 'cell block b', 'philadelphia railway', 'john f. kennedy', 'snug harbor', 'ides', 'green monorail', 'williamstown railroad', 'i', 'cell block d', 'b  orailroad', 'reading railroad', 'ohare airport', 'chelsea harbor', 'hemes', 'cell phone company', 'electric company', 'gas company', 'telephone company', 'ry', 'compost center', 'postal service', 'o', 'internet service provider', 'w', 'sewage system', 'seashore lines', 'satellite television', 'central railroad', 'hartsfield jackson', 'state marina', 'bids', 'blue monorail', 'yann', 'water works', 'yellow cab company', 'pennsylvania railroad', 'los angeles intl airport', 'checker cab company', 'cell block a', 'john f. kennedy airport', 'black white cab company', 'cell block c', 'bo railroad', 'recycling center', 'cable company', 'trash collector', 'satellite television provider', 'hartsfield jackson airport', 'ute cab company', 'alarm company', 'setor noroeste', 'park way', 'central market', 'prinsengracht', 'lago sul', 'kalku street', 'kalverstraat', 'brivibas street', 'eixo monumental', 'albert street', 'keizergracht', 'leidsestraat', 'lago norte', 'elizabetes street', 'herengracht', 'independence avenue', 'avenue de la costa', 'nyamiha street', 'ringstrasse', 'avenida margin', 'avenue louise', 'place du casino', 'vankovica street', 'tuchlauben', 'avenida da liberdade', 'rue du buisson', 'schreiberweg', 'avenue princesse grace', 'zhasminovaya street', 'kohlmarkt', 'rua do salitre', 'rue neuve', 'rua antonio saldanha', 'rue du marche aux fromages', 'avenue de la madone', 'pionerskaya street', 'larochegasse', 'rua garrett', 'chaussee dixelles', 'sheikh zayed road', 'herengr acht', 'alkhail road', 'grass street', 'prinsengr acht', 'alseef street', 'mcfarlane street', 'jumeir ah street', 'bayview terrace', 'market lane', 'emirates road', 'oriental par ade', 'avenida marginal', 'calle de serrano', 'miodowa street', 'paseo del prado', 'iaavenue henrimartin', 'avenida mexico', 'marsa street', 'calle de alcala', 'calle genova', 'rue de la paix', 'eje central', 'ujazdow avenue', 'wolska street', 'avenida de asturias', 'rue lafayette', 'avenida madero', 'avenue foch', 'avenue des champs.elysees', 'avenida insurgentes', 'nowy swiat street', 'gran viia', 'bogstadveien', 'london circuit', 'avenue henrimartin', 'rennweg', 'pilestredet', 'garema place', 'limmatquai', 'karl johans gate', 'kirkeveien', 'majura road', 'burkliplatz', 'paradeplatz', 'bunda street', 'bahnhofstrasse', 'ulleval haveby', 'gran via', 'kings avenue', 'kurfurstendamm', 'via sacra', 'ebertstrasse', 'red square', 'the boulevard', 'church street', 'piazza del popolo', 'unter den linden', 'union street', 'mosaic street', 'sherbrooke street', 'high street', 'via dei condotti', 'gianicolo promenade', 'potsdam square', 'ginza', 'academy street', 'summit circle', 'shibuya crossing', 'arbat street', 'omotesando avenue', 'belvedere place', 'via del corso', 'chausseestrasse', 'trafalgar square', 'nytorget square', 'mayfair', 'strandvagen', 'oxford street', 'downing street', 'kopmangatan', 'theatre square', 'abbey road', 'gotgatan', 'tverskaya street'];
  ownedCards: Card[] = new Array();
  allCards: Card[] = [];
  filteredCards: Card[] = [];
  lastSearch: string = "lake";


  mortagedWorth: number = 0;
  unmortagedWorth: number = 0;
  totalRawWorth: number = 0;
  totalMortaged: number = 0;
  currentWorth: number = 0;
  currentMortaged: number = 0;
  currentUnmortaged: number = 0;

  constructor() {
    this.allCardsNames.forEach(cardName => {
      var newCard = new Card();
      newCard.name = cardName;
      newCard.imageUrl = "/assets/Monopoly/" + cardName;
      newCard.mortaged = false;
      newCard.worth = 10 * 100;
      newCard.color = "green";
      this.allCards.push(newCard);

    });
    this.recalculateCards();
    this.filterCards();
  }

  ngOnInit(): void {
  }


  getWorth(mortagedOnly: boolean): number {
    var totalWorth = 0;
    this.ownedCards.forEach(card => {
      if (mortagedOnly) {
        totalWorth += card.worth / 2;
      }
      else {
        totalWorth += card.worth;
      }
    });
    return totalWorth;
  }

  getCurrentWorth(): number {
    var totalWorth = 0;
    this.ownedCards.forEach(card => {
      if (card.mortaged) {
        totalWorth += card.worth / 2;
      }
      else {
        totalWorth += card.worth;
      }
    });
    return totalWorth;
  }

  deleteCard(card: Card) {
    console.log("deleting card")
    const index = this.ownedCards.indexOf(card, 0);
    if (index > -1) {
      this.ownedCards.splice(index, 1);
    }
    this.filterCards();
    this.recalculateCards();
  }

  selectCard(card: Card) {
    card.mortaged = false;
    this.ownedCards.push(card);
    this.lastSearch = "";
    this.filterCards();
    this.recalculateCards();
  }

  filterCards(): void {
    console.log("searching for " + this.lastSearch)
    if (this.lastSearch.length > 1) {
      this.filteredCards = this.allCards.filter(card => card.name.toLowerCase().includes(this.lastSearch.toLowerCase()));
      var ignore = this.ownedCards.filter(card => card.name.toLowerCase().includes(this.lastSearch.toLowerCase()));
      ignore.forEach(card => {
        const index = this.filteredCards.indexOf(card, 0);
        if (index > -1) {
          this.filteredCards.splice(index, 1);
        }
      });
    }
    else {
      this.filteredCards = [];
    }
  }

  recalculateCards(): void {
    console.log("recalculating")
    this.totalMortaged = this.ownedCards.filter(card => card.mortaged).length;
    this.unmortagedWorth = this.getWorth(false);
    this.mortagedWorth = this.getWorth(true);

    var total = 0;
    this.ownedCards.forEach(card => {
      total += card.worth;
    });
    this.totalRawWorth = total;
    this.currentWorth = this.getCurrentWorth();
    this.currentMortaged = this.getCurrentMortagedWorth();
    this.currentUnmortaged = this.getCurrentUnmortagedWorth();
  }

  getCurrentMortagedWorth(): number {
    var totalWorth = 0;
    this.ownedCards.forEach(card => {
      if (card.mortaged) {
        totalWorth += card.worth / 2;
      }
    });
    return totalWorth;
  }

  getCurrentUnmortagedWorth(): number {
    var totalWorth = 0;
    this.ownedCards.forEach(card => {
      if (!card.mortaged) {
        totalWorth += card.worth;
      }
    });
    return totalWorth;
  }

  toggleMortageCard(card: Card): void {
    card.mortaged = !card.mortaged;
    this.recalculateCards();
  }
}
