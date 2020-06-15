import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, MultiDataSet } from 'ng2-charts';
import * as firebase from 'firebase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tab: number = 0;
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: { fontColor: 'white' },
        gridLines: { color: 'rgba(255,255,255,0.1)' }
      }],
      yAxes: [{
        ticks: { fontColor: 'white' },
        gridLines: { color: 'rgba(255,255,255,0.1)' }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  questions: number[][];
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['1-star', '2-star', '3-star', '4-star', '5-star'];
  public pieChartData: MultiDataSet = [
    [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]];

  public barChartData: ChartDataSets[][] = [
    [{ data: [0, 0, 0, 0, 0], label: 'Votes' }], [{ data: [0, 0, 0, 0, 0] }], [{ data: [0, 0, 0, 0, 0] }], [{ data: [0, 0, 0, 0, 0] }],
    [{ data: [0, 0, 0, 0, 0] }], [{ data: [0, 0, 0, 0, 0] }], [{ data: [0, 0, 0, 0, 0] }], [{ data: [0, 0, 0, 0, 0] }],
    [{ data: [0, 0, 0, 0, 0] }], [{ data: [0, 0, 0, 0, 0] }], [{ data: [0, 0, 0, 0, 0] }], [{ data: [0, 0, 0, 0, 0] }],
    [{ data: [0, 0, 0, 0, 0] }], [{ data: [0, 0, 0, 0, 0] }], [{ data: [0, 0, 0, 0, 0] }], [{ data: [0, 0, 0, 0, 0] }],
    [{ data: [0, 0, 0, 0, 0] }], [{ data: [0, 0, 0, 0, 0] }], [{ data: [0, 0, 0, 0, 0] }], [{ data: [0, 0, 0, 0, 0] }],
    [{ data: [0, 0, 0, 0, 0] }], [{ data: [0, 0, 0, 0, 0] }], [{ data: [0, 0, 0, 0, 0] }], [{ data: [0, 0, 0, 0, 0] }],
    [{ data: [0, 0, 0, 0, 0] }]
  ];

  public suggestion: number[] = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ]

  public pieChartType: ChartType = 'pie';
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public barChartPlugins = [];

  totalResponse: number = 0;
  number: number = 0;
  department;
  username;
  suggestionText = [
    "All looking good in this field.",
    "This could be better but doesn't require immediate atyentions.",
    "Situation don't look good here, do something immediately."
  ];


  constructor() {
    this.questions = [
      [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]];
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.username = firebase.auth().currentUser.displayName;
    firebase.database().ref('/users/admin/' + this.username).once('value')
      .then((snapshot) => {
        this.department = snapshot.val().department;
        this.getFeedback();
      });

  }

  getFeedback() {
    firebase.database().ref('/feedback/' + this.department).once('value')
      .then((snapshot) => {

        snapshot.forEach((childSnapshot) => {
          this.totalResponse++;
          childSnapshot.forEach((question) => {

            if (!isNaN(question.val())) {
              if (question.key == "question1") {
                this.questions[0][question.val() - 1]++;;
              }
              if (question.key == "question2") {
                this.questions[1][question.val() - 1]++;;
              }
              if (question.key == "question3") {
                this.questions[2][question.val() - 1]++;;
              }
              if (question.key == "question4") {
                this.questions[3][question.val() - 1]++;;
              }
              if (question.key == "question5") {
                this.questions[4][question.val() - 1]++;;
              }
              if (question.key == "question6") {
                this.questions[5][question.val() - 1]++;;
              }
              if (question.key == "question7") {
                this.questions[6][question.val() - 1]++;;
              }
              if (question.key == "question8") {
                this.questions[7][question.val() - 1]++;;
              }
              if (question.key == "question9") {
                this.questions[8][question.val() - 1]++;;
              }
              if (question.key == "question10") {
                this.questions[9][question.val() - 1]++;;
              }
              if (question.key == "question11") {
                this.questions[10][question.val() - 1]++;;
              }
              if (question.key == "question12") {
                this.questions[11][question.val() - 1]++;;
              }
              if (question.key == "question13") {
                this.questions[12][question.val() - 1]++;;
              }
              if (question.key == "question14") {
                this.questions[13][question.val() - 1]++;;
              }
              if (question.key == "question15") {
                this.questions[14][question.val() - 1]++;;
              }
              if (question.key == "question16") {
                this.questions[15][question.val() - 1]++;;
              }
              if (question.key == "question17") {
                this.questions[16][question.val() - 1]++;;
              }
              if (question.key == "question18") {
                this.questions[17][question.val() - 1]++;;
              }
              if (question.key == "question19") {
                this.questions[18][question.val() - 1]++;;
              }
              if (question.key == "question20") {
                this.questions[19][question.val() - 1]++;;
              }
              if (question.key == "question21") {
                this.questions[20][question.val() - 1]++;
              }
              if (question.key == "question22") {
                this.questions[21][question.val() - 1]++;
              }
              if (question.key == "question23") {
                this.questions[22][question.val() - 1]++;
              }
              if (question.key == "question24") {
                this.questions[23][question.val() - 1]++;
              }
              if (question.key == "question25") {
                this.questions[24][question.val() - 1]++;
              }
            }
          });
          this.number = 0;
          for (let i = 0; i < 25; i++) {
            this.pieChartData[i].pop();
            this.pieChartData[i].pop();
            this.pieChartData[i].pop();
            this.pieChartData[i].pop();
            this.pieChartData[i].pop();
            this.pieChartData[i].push(this.questions[i][0]);
            this.pieChartData[i].push(this.questions[i][1]);
            this.pieChartData[i].push(this.questions[i][2]);
            this.pieChartData[i].push(this.questions[i][3]);
            this.pieChartData[i].push(this.questions[i][4]);
            this.barChartData[i].pop();
            this.barChartData[i].push({ data: this.questions[i], label: 'Votes' });
            for( let k = 1; k <= 5; k++) {
              this.suggestion[i] += (k*this.questions[i][k-1]);
            }
            this.suggestion[i] = this.suggestion[i] / this.totalResponse;
          }

          monkeyPatchChartJsTooltip();
          monkeyPatchChartJsLegend();
        });
      });
  }

}
