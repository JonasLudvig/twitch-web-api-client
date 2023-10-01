import { addChannel } from './addChannel.js';
import { apiDetailsEvent } from '../obj/apiDetails.js';
import { liveOnly } from './liveOnly.js';
import { refreshChannels } from './refreshChannels.js';
import { sortAlphabetically } from './sortAlphabetically.js';
import { sortByViewerCount } from './sortByViewerCount.js';

export function initListeners() {
  document.querySelector('.add-channel')?.addEventListener('click', addChannel);
  document
    .querySelector('.refresh-channels')
    ?.addEventListener('click', refreshChannels);
  document
    .querySelector('.sort-by-viewer-count')
    ?.addEventListener('click', sortByViewerCount);
  document
    .querySelector('.sort-alphabetically')
    ?.addEventListener('click', sortAlphabetically);
  document.querySelector('.live-only')?.addEventListener('click', liveOnly);
  document
    .querySelector('.api-details')
    ?.addEventListener('click', apiDetailsEvent);
}
