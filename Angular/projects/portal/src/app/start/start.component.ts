import { Component, OnDestroy } from '@angular/core';
import {Router} from "@angular/router";
import { ApiService } from '../services/api.service';import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { wish } from '../wish';
import { SnowFlakeComponent } from "./snow-flake.component";
import { SnowFlakeConfig } from './snow';


@Component({
  selector: 'app-start',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SnowFlakeComponent],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})


export class StartComponent implements OnDestroy{

  public snowflakes: SnowFlakeConfig[];
  constructor(private router: Router,
    private apiService: ApiService
  ) {
    this.snowflakes = [];
    for(var i=0; i<150; i++){
      this.snowflakes.push({
        depth: this.randRange(1, 5),
        left: this.randRange(0, 100),
        speed: this.randRange(1, 5)
      })
    }
  }
  sub: any[] = [];
  admin: boolean = false;
  state: number = 1;
  
  data = new FormGroup({
    name: new FormControl(""),
    wish: new FormControl("")
  });

  data2 = new FormGroup({
    id: new FormControl(""),
    status: new FormControl(1)
  });

  data3 = new FormGroup({
    cnt: new FormControl(1)
  });

  testResult: string | null = null;
  startMultipleUserSimulation(data: any): void {
    const totalRequests = data.value.cnt;
    if (totalRequests > 0){
    let completed = 0;
    const startTime = performance.now();
    var wish1: wish = {wish: "test", name: "trees"};
    for(let i=0; i< totalRequests; i++){
      this.sub.push(this.apiService.add(wish1).subscribe({
        next: () => {
          completed++;
          if (completed === totalRequests) {
            const endTime = performance.now();
            const durationInSeconds = (endTime - startTime) / 1000;
            this.testResult = `${totalRequests} Requests in ${durationInSeconds.toFixed(
              2
            )} Sekunden <br>
             (${(totalRequests / durationInSeconds).toFixed(
              2
            )} Requests/Sekunde)`;
          }
        },
        error: (err) => console.error('Fehler:', err),
      }));
    }
  }else{
    this.testResult = "Falsche Eingabe!";
  }
  }

  sendWish(data: any): void {
    var wish1: wish = {wish: data.value.wish, name: data.value.name};
    this.sub.push(this.apiService.add(wish1).subscribe());
    this.testResult = "An den Weihnachtsmann gesandt!"
  }

  getWish(data: any): void{
    this.testResult = "";
    this.sub.push(this.apiService.get(data.value.name).subscribe(res =>{
      res.forEach((element: { wish: string; status: number; id: string }) => {
        this.testResult += "ID: " + element.id + "<br>" + "Wunsch: " + element.wish + ", Status: ";
        if(element.status == 1){
          this.testResult += "Formuliert <br><br>"
        }else if(element.status == 2){
          this.testResult += "In Bearbeitung <br><br>"
        }else if(element.status == 3){
          this.testResult += "In Auslieferung <br><br>"
        }else if(element.status == 4){
          this.testResult += "Unterm Weihnachtsbaum <br><br>"
        }
      });
    }));
  }

  editStatus(data: any): void{
    if (data.value.status < 1 || data.value.status > 4){
      this.testResult = "Status nicht erkannt!";
    }else{
      this.sub.push(this.apiService.setStatus(data.value.id, data.value.status).subscribe(res=>{
        this.testResult = "Status wurde zu ";
        if(data.value.status == 1){
          this.testResult += "'Formuliert' geändert!"
        }else if(data.value.status == 2){
          this.testResult += "'In Bearbeitung' geändert!"
        }else if(data.value.status == 3){
          this.testResult += "'In Auslieferung' geändert!"
        }else if(data.value.status == 4){
          this.testResult += "'Unterm Weihnachtsbaum' geändert!"
        }
      }));
    }
  }

  ngOnDestroy(){
    this.sub.forEach(element => {
      element.unsubscribe();
    });
  }

  private randRange( min: number, max: number ) : number {

		var range = ( max - min );

		return( min + Math.round( Math.random() * range ) );


	}

  setState(state: number){
    this.state = state;
    this.testResult = "";
  }


}
