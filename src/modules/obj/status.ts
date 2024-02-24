import { Stamp } from './stamp.js';

export class Status {
  constructor(prompt: string) {
    this.prompt = prompt;
    this.stamp = new Stamp().getStamp();
    this.id = `s-${this.stamp[0].replace(/:/g, '')}`;
  }

  private prompt!: string;
  private stamp!: [string, string];
  private id!: string;
  private response: number = 202;
  private responseTime!: number;

  getPrompt = () => this.prompt;
  getStamp = () => this.stamp[0];
  getId = () => this.id;
  getResponse = () => this.response;
  setResponse(response: number) {
    this.response = response;

    const [nowStamp, nowMilliseconds] = new Stamp().getStamp();
    const [olderStamp, olderMilliseconds] = this.stamp;

    const [nowHours, nowMinutes, nowSeconds] = nowStamp.split(':').map(Number);
    const [olderHours, olderMinutes, olderSeconds] = olderStamp
      .split(':')
      .map(Number);

    const nowMillis = parseInt(nowMilliseconds, 10);
    const olderMillis = parseInt(olderMilliseconds, 10);

    this.responseTime =
      (nowHours - olderHours) * 3600 +
      (nowMinutes - olderMinutes) * 60 +
      (nowSeconds - olderSeconds) +
      (nowMillis - olderMillis) / 1000;
  }
  getResponseTime = () => this.responseTime.toFixed(2);
}
