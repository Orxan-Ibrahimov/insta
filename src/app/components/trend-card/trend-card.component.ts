import { Component, OnInit } from '@angular/core';
import { Trend } from 'src/app/models/trendData';

@Component({
  selector: 'app-trend-card',
  templateUrl: './trend-card.component.html',
  styleUrls: ['./trend-card.component.scss']
})
export class TrendCardComponent implements OnInit {

  constructor() { }

  trends:Trend[] = [
    {id:1, name: "Minions", shares: 97},
    {id:2, name: "Avengers", shares: 80.5},
    {id:3, name: "Zainkeepscode", shares: 75.5},
    {id:4, name: "React.js", shares: 72},
    {id:5, name: "Elon Musk", shares: 56},
  ]
  ngOnInit(): void {
  }

}
