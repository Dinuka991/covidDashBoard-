import { Component, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css']
})
export class CovidComponent implements OnInit {



  countries: any;
  filteredOptions: Observable<COUNTRY[]>;
  states: COUNTRY[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['date', 'count'];
  dataSource = new MatTableDataSource<PCR>();
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

  constructor(private covidService: CovidService , private fb: FormBuilder ) { }

  ngOnInit() {


    //this.options = this.countries;
    this.filteredOptions = this.covidForm.get('countryName').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    
    
    this.getCovidStatics();
    this.getCountries();

    
  }
  covidForm = this.fb.group({
    countryName: ['']
  })
  private _filter(value: string): COUNTRY[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
 

 
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  getCountries(){
     this.covidService.getCountries()
            .subscribe( (data: any) => {
              console.log(data)
             

              this.countries = data as COUNTRY[];
              
            })
  }
  getCovidStatics(){
    this.covidService.getCovidStatics()
                .subscribe( (data: any ) => {


                  this.localActiveCases = data.data.local_active_cases;
                  console.log(data)
                  console.log(this.localActiveCases)
                  this.locatTotalCases = data.data.local_total_cases;
                  this.localRecovered = data.data.local_recovered;
                  this.localDeaths = data.data.local_deaths;

                  var count = Object.keys(data.data.daily_pcr_testing_data).length;
                  this.totalCount = count;
                  this.pageSize =  10;
                  console.log(count);
              
                  this.dataSource.data = data.data.daily_pcr_testing_data  as PCR[];
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
  name: string,
  Slug: string
}


