import { drawPop } from '../common/drawPop.js';
import { Pop } from '../obj/pop.js';

export function addChannel() {
  const pop = new Pop('Add channel by ID, e.g. 37402112', 'Add channel');

  drawPop(pop);
}
