export class Pop {
  constructor(header: string, action?: string) {
    this.header = header;
    this.action = action;
  }

  private header!: string;
  private action?: string;

  getHeader = () => this.header;
  getAction = () => this.action;
}
