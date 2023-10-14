import { ChannelAndStream } from '../obj/channelAndStream.js';
import { drawStatus } from './drawStatus.js';
import { Status } from '../obj/status.js';

interface ChannelData {
  id: string;
  display_name: string;
  profile_image_url: string;
}

interface StreamData {
  user_id: string;
  viewer_count: string;
  game_name: string;
}

export async function getChannelsAndStreams(
  queryString: string,
  status: Status
) {
  const response = await fetch(
    `https://qsdlr.org/twitch-rest-api/get-user?${queryString}`
  );
  const channelsArray = JSON.parse(await response.json());
  const channelData: ChannelData[] = channelsArray.data;

  const responseStream = await fetch(
    `https://qsdlr.org/twitch-rest-api/get-stream?${queryString.replace(
      /id=/g,
      'user_id='
    )}`
  );
  status?.setResponse(responseStream.status);
  if (status) drawStatus(status);

  const streamsArray = JSON.parse(await responseStream.json());
  const streamData: StreamData[] = streamsArray.data;

  const channelsAndStreams: ChannelAndStream[] = channelData.map(
    (channel: ChannelData) => {
      const channelAndStream = new ChannelAndStream(
        channel.display_name,
        channel.profile_image_url
      );
      const channelStreams = streamData.filter(
        (stream) => stream.user_id === channel.id
      );

      if (channelStreams.length > 0) {
        const sortedStreams = channelStreams.sort((a, b) => {
          const viewerCountA = parseInt(a.viewer_count);
          const viewerCountB = parseInt(b.viewer_count);
          return viewerCountB - viewerCountA;
        });

        const topStream = sortedStreams[0];
        channelAndStream.setViewerCount(parseInt(topStream.viewer_count));
        channelAndStream.setGame(topStream.game_name);
      }

      return channelAndStream;
    }
  );

  return channelsAndStreams;
}
