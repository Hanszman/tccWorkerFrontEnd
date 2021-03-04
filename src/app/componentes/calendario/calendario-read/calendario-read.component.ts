import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

@Component({
  selector: 'app-calendario-read',
  templateUrl: './calendario-read.component.html',
  styleUrls: ['./calendario-read.component.css']
})
export class CalendarioReadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locales: [ ptBrLocale ],
    locale: 'pt-br',
    themeSystem: 'bootstrap',
    dateClick: this.handleDateClick.bind(this),
    events: [
      { title: 'event 1', date: '2021-03-01' },
      { title: 'event 2', date: '2021-03-02' }
    ]
  };

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
}