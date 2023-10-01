import { drawChannelFeed } from '../common/drawChannelFeed.js';
import { sortingOptions } from '../../app.js';

export function liveOnly() {
  if (sortingOptions.getLiveOnly()) {
    document.querySelector('.check-mark')?.remove();
    sortingOptions.setLiveOnly(false);
  } else {
    const chk = document.createElement('img');
    chk.src = './src/static/ico/check-mark.svg';
    chk.classList.add('check-mark');
    document.querySelector('.live-only')?.appendChild(chk);
    sortingOptions.setLiveOnly(true);
  }

  drawChannelFeed(sortingOptions);
}
