import { DatePipe } from '@angular/common';

export function formatDateHelper(date: Date): string {
  const datePipe = new DatePipe('en-US');
  const formattedDate = `Feito em ${datePipe.transform(
    date,
    'dd/MM/yyyy'
  )} às ${datePipe.transform(date, 'HH:mm')}`;
  return formattedDate;
}
