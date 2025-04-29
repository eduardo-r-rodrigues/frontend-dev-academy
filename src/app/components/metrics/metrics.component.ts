import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-metrics',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule],
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
})
export class MetricsComponent implements OnInit {
  metrics = {
    total_executions: 5,
    avg_latency_ms: 157.3,
    avg_cost: 0.0021,
  };

  ngOnInit(): void {}
}
