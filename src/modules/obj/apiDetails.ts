import { apiDetails, sortingOptions } from '../../app.js';
import { drawChannelFeed } from '../common/drawChannelFeed.js';

export class ApiDetails {
  constructor(apiDetails: boolean) {
    this.apiDetails = apiDetails;
  }

  private apiDetails!: boolean;

  getApiDetails = () => this.apiDetails;
  setApiDetails = (input: boolean) => (this.apiDetails = input);
}

export function drawApiDetails() {
  if (apiDetails.getApiDetails()) {
    const chk = document.createElement('img');
    chk.src = './src/static/ico/check-mark.svg';
    chk.classList.add('check-mark');
    document.querySelector('.api-details')?.appendChild(chk);
  }
}

export function apiDetailsEvent() {
  if (apiDetails.getApiDetails()) {
    document.querySelector('.check-mark')?.remove();

    Array.from(document.getElementsByClassName('status-entry')).forEach(
      (element) => {
        element.remove();
      }
    );

    apiDetails.setApiDetails(false);
  } else {
    const chk = document.createElement('img');
    chk.src = './src/static/ico/check-mark.svg';
    chk.classList.add('check-mark');
    document.querySelector('.api-details')?.appendChild(chk);
    apiDetails.setApiDetails(true);
  }

  drawChannelFeed(sortingOptions);
}
