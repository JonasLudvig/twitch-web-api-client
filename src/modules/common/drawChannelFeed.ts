import { ChannelAndStream } from '../obj/channelAndStream.js';
import { channelsAndStreams } from '../../app.js';
import { SortingOptions } from '../obj/sortingOptions.js';

const mnPnl = document.querySelector('.main-panel') as HTMLElement;
const sdPnlFd = document.querySelector('.side-panel-feed');
const twitchEmbed = document.querySelector('#twitch-embed');

export let renderObject: ChannelAndStream[];

async function setRenderObject() {
  try {
    renderObject = await channelsAndStreams;
  } catch (error) {
    console.error(error);
  }
}

export function drawChannelFeed(sortingOption: SortingOptions) {
  setRenderObject().then(() => {
    if (sortingOption.getOrderBy() === 'viewerCountDesc') {
      renderObject.sort((a, b) => {
        const viewerCountA = a.getViewerCount() || 0;
        const viewerCountB = b.getViewerCount() || 0;

        return viewerCountB - viewerCountA;
      });
    } else if (sortingOption.getOrderBy() === 'displayName') {
      renderObject.sort((a, b) => {
        const displayNameA = a.getDisplayName().toLowerCase();
        const displayNameB = b.getDisplayName().toLowerCase();

        if (displayNameA < displayNameB) return -1;
        if (displayNameA > displayNameB) return 1;
        return 0;
      });
    }

    Array.from(document.getElementsByClassName('channel-entry')).forEach(
      (element) => {
        element.remove();
      }
    );

    renderObject.forEach((channelAndStream) => {
      if (sortingOption.getLiveOnly() && !channelAndStream.getGame()) return;

      const displayName = channelAndStream.getDisplayName();
      const image = channelAndStream.getImage();
      const viewerCount = channelAndStream.getViewerCount();
      const game = channelAndStream.getGame();

      const chnEnt = document.createElement('button');
      chnEnt.classList.add('channel-entry');

      const chnEntCntLt = document.createElement('div');
      const chnEntCntRt = document.createElement('div');

      chnEnt.appendChild(chnEntCntLt);
      chnEnt.appendChild(chnEntCntRt);

      const img = document.createElement('img');
      img.src = image;
      chnEntCntLt.appendChild(img);

      const dspNm = document.createElement('h1');
      dspNm.innerText = displayName;
      chnEntCntRt.appendChild(dspNm);

      chnEnt.addEventListener('click', function () {
        mnPnl.style.display = 'none';

        if (twitchEmbed !== null) {
          twitchEmbed.innerHTML = '';
        }

        // @ts-ignore
        new Twitch.Embed('twitch-embed', {
          width: '100%',
          height: '100%',
          muted: false,
          channel: displayName,
        });
      });

      if (sdPnlFd !== null) sdPnlFd.appendChild(chnEnt);

      if (viewerCount) {
        const lv = document.createElement('p');
        lv.classList.add('live');
        lv.innerText = 'live'.toUpperCase();
        chnEntCntRt.appendChild(lv);

        const vCt = document.createElement('p');
        vCt.classList.add('viewer-count');
        vCt.innerText = viewerCount + ' viewers';
        chnEntCntRt.appendChild(vCt);
      }

      const gm = document.createElement('p');
      if (game) gm.innerText = game;
      else gm.innerText = 'Offline';

      chnEntCntRt.appendChild(gm);
    });
  });
}
