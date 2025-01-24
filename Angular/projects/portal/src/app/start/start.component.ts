import { Component, OnDestroy, OnInit } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import { interval, Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { wish } from '../wish';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent implements OnDestroy{

  constructor(private router: Router,
    private apiService: ApiService
  ) {
  }
// Initialisiere das Array mit der Größe 10
  private subscription!: Subscription;
  fireflies: any[][] = [];
  
  subStart: any;
  subStop: any;
  running: boolean = false;
  
  zoomLevel: number = 1;
  data = new FormGroup({
    coupling: new FormControl(0.5),
    row: new FormControl(10),
    column: new FormControl(25),
    updateTime: new FormControl(50)
  });

  testResult: string | null = null;
  start(data: any): void {
    const totalRequests = 1000;
    let completed = 0;
    const startTime = performance.now();
    var wish1: wish = {id: 1, wish: "skateboard", name: "peter", status:1};
    for(let i=0; i< totalRequests; i++){
      wish1.id = i;
      this.apiService.add(wish1).subscribe({
        next: () => {
          completed++;
          if (completed === totalRequests) {
            const endTime = performance.now();
            const durationInSeconds = (endTime - startTime) / 1000;
            this.testResult = `${totalRequests} Requests in ${durationInSeconds.toFixed(
              2
            )} Sekunden (${(totalRequests / durationInSeconds).toFixed(
              2
            )} Requests/Sekunde)`;
            console.log(this.testResult);
          }
        },
        error: (err) => console.error('Fehler:', err),
      });
    }
  }

  stop(): void {
   
  }

  
  zoomIn() {
    this.zoomLevel = Math.min(this.zoomLevel + 0.1, 3); // Maximal 300%
  }

  zoomOut() {
    this.zoomLevel = Math.max(this.zoomLevel - 0.1, 0.1); // Minimal 10%
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subStart.unsubscribe();
    this.subStop.unsubscribe();
  }

}
