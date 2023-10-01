export class Queue {
  constructor(queue: string[]) {
    this.queue = queue;
  }

  private queue!: string[];
  private queryString!: string;

  getQueryString = () => this.queryString;

  updateQueryString() {
    this.queryString = this.queue
      .map((id, index) => (index === 0 ? id : `id=${id}`))
      .join('&');
  }

  add(channel: string) {
    this.queue.push(channel);
  }
}
