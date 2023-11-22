import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-monopoly',
  templateUrl: './monopoly.component.html',
  styleUrls: ['./monopoly.component.scss']
})
export class MonopolyComponent implements OnInit {
  Math = Math;
  allCardsNames: string[];
  ownedCards: Card[] = new Array();
  allCards: Card[] = [];
  filteredCards: Card[] = [];
  lastSearch: string = "";


  mortagedWorth: number = 0;
  unmortagedWorth: number = 0;
  totalRawWorth: number = 0;
  totalMortaged: number = 0;
  currentWorth: number = 0;
  currentMortaged: number = 0;
  currentUnmortaged: number = 0;

  constructor() {
    this.allCardsNames = environment.allCardNames;
    this.allCardsNames.forEach(cardName => {
      var newCard = new Card();
      newCard.name = cardName;
      newCard.imageUrl = "/assets/Monopoly/" + cardName;
      newCard.mortaged = false;
      newCard.worth = 10 * 100;
      newCard.color = "green";
      this.allCards.push(newCard);

    });
    this.filterCards();
    this.ownedCards = JSON.parse(localStorage.getItem('currentHand') ?? '[]');
    this.recalculateCards();
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
