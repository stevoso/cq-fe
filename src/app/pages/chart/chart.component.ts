import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {MatDialog} from "@angular/material/dialog";
import {EChartsOption} from "echarts";
import {UserDetailComponent} from "../../modals/user-detail/user-detail.component";
import {MatFormField, MatHint, MatInput, MatInputModule, MatLabel} from "@angular/material/input";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {NgxEchartsDirective} from "ngx-echarts";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    MatInput,
    MatDatepickerInput,
    FormsModule,
    MatButton,
    NgxEchartsDirective,
    MatDatepicker,
    NgForOf,
    MatFormField,
    MatDatepickerToggle,
    MatLabel,
    MatHint,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, NgIf, DatePipe
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})

export class ChartComponent implements OnInit {
  chartOptions: EChartsOption = {};
  users: any[] = [];
  countries: any[] = [];
  startDate: Date | undefined;
  endDate: Date | undefined;

  constructor(private apiService: ApiService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadChartData();
  }

  loadChartData() {
    this.apiService.getUsers(this.startDate, this.endDate).subscribe(data => {
      this.users = data;
      this.updateChartOptions();
    });
  }

  updateChartOptions() {
    const countryCounts = this.users.reduce((acc, user) => {
      acc[user.country.name] = (acc[user.country.name] || 0) + 1;
      return acc;
    }, {});

    this.chartOptions = {
      series: [
        {
          type: 'pie',
          data: Object.keys(countryCounts).map(key => ({ name: key, value: countryCounts[key] }))
        }
      ]
    };
  }

  onDateChange() {
    this.loadChartData();
  }

  openUserDialog(user?: any) {
    const dialogRef = this.dialog.open(UserDetailComponent, {
      width: '400px',
      data: user || { firstName: '', lastName: '', dateOfBirth: '', country: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.apiService.updateUser(result.id, result).subscribe(() => this.loadChartData());
        } else {
          this.apiService.addUser(result).subscribe(() => this.loadChartData());
        }
      }
    });
  }

  deleteUser(id: number) {
    this.apiService.deleteUser(id).subscribe(() => this.loadChartData());
  }
}
