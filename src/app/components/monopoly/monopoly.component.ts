import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-monopoly',
  templateUrl: './monopoly.component.html',
  styleUrls: ['./monopoly.component.scss']
})
export class MonopolyComponent implements OnInit {
  Math = Math;
  ownedCards: Card[] = new Array();
  allCards: Card[] = [];
  filteredCards: Card[] = [];
  lastSearch: string = "";
  dataLoaded: boolean = false;

  mortagedWorth: number = 0;
  unmortagedWorth: number = 0;
  totalRawWorth: number = 0;
  totalMortaged: number = 0;
  currentWorth: number = 0;
  currentMortaged: number = 0;
  currentUnmortaged: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {

    var rawCards: { [key: string]: { Cost: number } };
    this.http.get('/assets/CardMetadata.json').subscribe((res: any) => {
      rawCards = res;
      Object.keys(rawCards).forEach((key: string) => {
        var rawCard = rawCards[key];
        console.log(rawCard);
        var newCard = new Card();
        newCard.name = key;
        newCard.imageUrl = "/assets/Monopoly/" + key;
        newCard.mortaged = false;
        newCard.worth = rawCard.Cost;
        newCard.color = "green";
        this.allCards.push(newCard);

        this.dataLoaded = true;
      });
      this.filterCards();
      this.loadData();
      this.recalculateCards();
    });
  }


  loadData() {
    var data = JSON.parse(localStorage.getItem('currentHand') ?? '[]') as Card[];
    data.forEach(card => {
      var cardName = card.name;
      console.log(cardName + " loading from save");
      // Why by name? Because metadata may change and want to reload it in this poor loading system
      this.selectCardByName(cardName);

    })
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
    this.saveCurrentHand();
  }

  selectCard(card: Card) {
    card.mortaged = false;
    this.ownedCards.push(card);
    this.lastSearch = "";
    this.filterCards();
    this.recalculateCards();

    this.saveCurrentHand();
  }


  selectCardByName(name: string) {
    var card = this.allCards.filter(card => card.name.toLowerCase() == name.toLowerCase())[0];
    card.mortaged = false;
    this.ownedCards.push(card);
    this.lastSearch = "";
    this.filterCards();
    this.recalculateCards();

    this.saveCurrentHand();
  }

  saveCurrentHand() {
    //basic as hell
    console.log("saving");
    localStorage.setItem('currentHand', JSON.stringify(this.ownedCards));
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
    this.saveCurrentHand();
  }
}
