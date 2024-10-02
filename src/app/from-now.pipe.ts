import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';

@Pipe({
  name: 'fromNow',
  standalone: true
})
export class FromNowPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return formatDistanceToNowStrict(parseISO(value), { addSuffix: true });
  }
}
