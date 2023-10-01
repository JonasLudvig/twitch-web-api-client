import { drawChannelFeed } from '../common/drawChannelFeed.js';
import { drawStatus } from '../common/drawStatus.js';
import { getChannelsAndStreams } from '../common/getChannelsAndStreams.js';
import { queue, setChannelsAndStreams, sortingOptions } from '../../app.js';
import { Status } from '../obj/status.js';

export function refreshChannels() {
  const status = new Status('Refreshing channels');
  drawStatus(status);

  setChannelsAndStreams(getChannelsAndStreams(queue.getQueryString(), status));
  drawChannelFeed(sortingOptions);
}
