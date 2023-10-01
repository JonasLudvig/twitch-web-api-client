export class Stamp {
  constructor() {
    this.format = navigator.language;
  }

  private format: string;

  setFormat = (input: string) => (this.format = input);

  getStamp(): string {
    const currentDate = new Date();

    const stamp = currentDate.toLocaleTimeString(this.format, {
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });

    return stamp;
  }
}
