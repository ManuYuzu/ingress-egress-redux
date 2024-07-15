import { Pipe, PipeTransform } from '@angular/core';
import { IngressEgress } from '../models/ingress-egress.model';

@Pipe({
  name: 'ingressEgressOrder'
})
export class IngressEgressOrderPipe implements PipeTransform {

  transform( items: IngressEgress[] ): IngressEgress[] {

    return [...items]
    .sort( item => {

      if (item.type == 'ingress') return -1;
      else return 1

    })
    .sort( (a, b) => {
      if (a.type === b.type) return b.amount - a.amount
      else return 0
    })
  }

}
