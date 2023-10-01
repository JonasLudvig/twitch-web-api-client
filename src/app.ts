import { ApiDetails, drawApiDetails } from './modules/obj/apiDetails.js';
import { ChannelAndStream } from './modules/obj/channelAndStream.js';
import { drawChannelFeed } from './modules/common/drawChannelFeed.js';
import { drawStatus } from './modules/common/drawStatus.js';
import { getChannelsAndStreams } from './modules/common/getChannelsAndStreams.js';
import { initListeners } from './modules/menu/initListeners.js';
import { Queue } from './modules/obj/queue.js';
import { SortingOptions } from './modules/obj/sortingOptions.js';
import { Status } from './modules/obj/status.js';

export const GET_CHANNELS_URL = '';
export const GET_STREAMS_URL = '';

export let channelsAndStreams: Promise<ChannelAndStream[]>;

export function setChannelsAndStreams(input: Promise<ChannelAndStream[]>) {
  channelsAndStreams = input;
}

initListeners();

export const queue = new Queue([
  '27446517',
  '31239503',
  '19070311',
  '26301881',
]);
queue.updateQueryString();

const status = new Status('Initializing channels');
drawStatus(status);

channelsAndStreams = getChannelsAndStreams(queue.getQueryString(), status).then(
  (result) => {
    return result;
  }
);

export const sortingOptions = new SortingOptions('viewerCountDesc', false);

export const apiDetails = new ApiDetails(true);
drawApiDetails();

drawChannelFeed(sortingOptions);
