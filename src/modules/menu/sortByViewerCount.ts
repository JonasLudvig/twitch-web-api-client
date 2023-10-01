import { drawChannelFeed } from '../common/drawChannelFeed.js';
import { sortingOptions } from '../../app.js';

export function sortByViewerCount() {
  sortingOptions.setOrderBy('viewerCountDesc');
  drawChannelFeed(sortingOptions);
}
