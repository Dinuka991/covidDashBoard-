import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { CovidService } from '../covid.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ChartType } from 'chart.js';
import { MultiDataSet  } from 'ng2-charts';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormBuilder ,FormGroup , FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {MatSort} from '@angular/material/sort';
import {  ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css']
})
export class CovidComponent implements OnInit {



 
  filteredStates: Observable<State[]>;
 
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  displayedColumns: string[] = ['date', 'count'];
  displayedColumns2: string[] = ['Date', 'Cases'];
  dataSource2 = new MatTableDataSource<PCR>();
  dataSource3 = new MatTableDataSource<STATICS>();
  localActiveCase: number;
  globalActiveCase: number;
  localRecoverd: number;
  doughnutChartLabels: Label[] = [ 'Total Deaths',  'Confirmed Cases', 'Recovered' , 'Active'];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutChartType: ChartType = 'doughnut';



  lineChartData: ChartDataSets[] = [{ data: [330, 600, 260, 700], label: 'Account A' }];
  lineChartLabels: Label[] = [];
  chartLabels = [];
  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  localActiveCases: any;
  locatTotalCases: any;
  localRecovered: any;
  localDeaths: any;
  totalCount: number;
  pageSize: number;
  countries: COUNTRY[] = [];
  countryName: any;
  selectedCountry: string;
  startDate: Date;
  endDate: Date;

  constructor(private covidService: CovidService ,private cdr: ChangeDetectorRef, private fb: FormBuilder ,   public datepipe: DatePipe ) { 
    this.filteredStates = this.covidForm.get('countryName').valueChanges
    .pipe(
      startWith(''),
      map(state => state ? this._filterStates(state) : this.countries.slice())
    );
  }

  ngOnInit() {

    
    //this.options = this.countries;
    this.dataSource2.paginator = this.paginator.toArray()[0];;
    this.dataSource3.paginator = this.paginator.toArray()[1];;
    
    this.getCovidStatics();
    this.getCountries();
    this.covidForm.get("countryName").valueChanges.subscribe(x => {
      console.log(x);
      this.selectedCountry = x;
      console.log(this.selectedCountry);
    })
    
  }
  covidForm = this.fb.group({
    countryName: [''],
    startDate: [''],
    endDate: ['']
  })
  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.countries.filter(state => state.Country.toLowerCase().indexOf(filterValue) === 0);
  }

 
  ngAfterViewInit(): void {
    this.dataSource2.paginator = this.paginator.toArray()[0];;
    this.dataSource3.paginator = this.paginator.toArray()[1];;
    this.dataSource2.sort = this.sort.toArray()[0];
    this.dataSource3.sort = this.sort.toArray()[1];

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }
  
  getCountries(){
     this.covidService.getCountries()
            .subscribe( (data: any) => {
              this.countries  = data;
            
            })
  }
  getGlobaleCases(){
   

    this.covidService.getGlobaleCases(this.covidForm.get('countryName').value ,  this.datepipe.transform(this.covidForm.get('startDate').value, 'yyyy-MM-dd') ,  this.datepipe.transform(this.covidForm.get('endDate').value, 'yyyy-MM-dd'))
      .subscribe( (data: any) => {
        this.pageSize =  10;
        this.cdr.detectChanges();
        this.dataSource3.data = data as STATICS[];
                            
        
      })
  }
  getCovidStatics(){
    this.covidService.getCovidStatics()
                .subscribe( (data: any ) => {


                  this.localActiveCases = data.data.local_active_this
                  console.log(this.localActiveCases)
                  this.locatTotalCases = data.data.local_total_cases;
                  this.localRecovered = data.data.local_recovered;
                  this.localDeaths = data.data.lthisal_deaths;

                  var count = Object.keys(data.data.daily_pcr_testing_data).length;
                  this.totalCount = count;
                  this.pageSize =  10;
                  console.log(count);
              
                 this.dataSource2.data = data.data.daily_pcr_testing_data  as PCR[];
                   //console.log(data.data.daily_pcr_testing_data);
                  // console.log(data.data.daily_pcr_testing_data.map(a => a.count));
                   const projects = data.data.daily_pcr_testing_data.map(a => a.count);
                   const projects2 = data.data.daily_pcr_testing_data.map(a => a.date);
                   //console.log(projects)
                   projects.forEach(projet=> {
                    
                      //console.log(projects.map((i) => Number(i)));

                      let array = projects.map((i) => Number(i));
                       //console.log(array)
                      
                       this.doughnutChartData = [ this.localDeaths , this.locatTotalCases , this.localRecovered , this.localActiveCases ]
                      this.lineChartData = [{ data: [ 149, 174, 143, 164, 128, 131, 152, 108, 136, 155, 224, 219, 250, 311, 295, 324, 394, 353, 376, 287, 397, 393, 609, 431, 342, 465, 548, 710, 522, 702, 642, 650, 774, 1141, 876, 816, 1075, 1869, 1139, 1545, 1397, 1107, 1681, 1636, 1045, 1491, 1147, 1553] , label: 'COVID 19' }];
                      this.chartLabels = projects2;


                   
                 

                   }
                 
                    );
                    
                  



                          //START: put data in Bar Chart
             
                //{ data: data.daily_pcr_testing_data.map(a => a.count), label: 'Defects' },
              
                  //this.lineChartLabels = data.daily_pcr_testing_data.map(a => a.date);
              //END: put data in Bar Chart

                },
                error => {

                });

  }

}
export interface PCR {
  date: Date;
  count: number;
}

export interface COUNTRY{
  Country: string,
  Slug: string
}

export interface State {
  Country: string,
  Slug: string
}

export interface STATICS{
    Date: Date;
    Cases: string,
}

