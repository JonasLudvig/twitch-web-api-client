import { drawChannelFeed } from '../common/drawChannelFeed.js';
import { sortingOptions } from '../../app.js';

export function sortAlphabetically() {
  sortingOptions.setOrderBy('displayName');
  drawChannelFeed(sortingOptions);
}
