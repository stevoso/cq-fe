import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {ApiService} from "../../services/api.service";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    MatDatepickerInput,
    MatInput,
    MatDialogTitle,
    MatDialogContent,
    MatSelect,
    MatDatepicker,
    MatOption,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    NgForOf,
    MatDatepickerToggle,
    MatHint,
    MatLabel,
    MatSuffix
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})

export class UserDetailComponent implements OnInit {
  countries: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService
  ) {
    console.log(data);
  }

  ngOnInit() {
    this.apiService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
