import { Stamp } from './stamp.js';

export class Status {
  constructor(prompt: string) {
    this.prompt = prompt;
    this.stamp = new Stamp().getStamp();
    this.id = `s-${this.stamp.replace(/:/g, '')}`;
  }

  private prompt!: string;
  private stamp!: string;
  private id!: string;
  private response: number = 202;
  private reponseTime!: number;

  getPrompt = () => this.prompt;
  getStamp = () => this.stamp;
  getId = () => this.id;
  getResponse = () => this.response;
  setResponse(response: number) {
    this.response = response;

    const [nowHours, nowMinutes, nowSeconds] = new Stamp()
      .getStamp()
      .split(':')
      .map(Number);
    const [olderHours, olderMinutes, olderSeconds] = this.stamp
      .split(':')
      .map(Number);

    this.reponseTime =
      (nowHours - olderHours) * 3600 +
      (nowMinutes - olderMinutes) * 60 +
      (nowSeconds - olderSeconds);
  }

  getResponseTime = () => this.reponseTime;
}
