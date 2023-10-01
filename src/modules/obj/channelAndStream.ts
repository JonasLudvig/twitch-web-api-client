export class ChannelAndStream {
  constructor(displayName: string, image: string) {
    this.displayName = displayName;
    this.image = image;
  }

  private displayName!: string;
  private image!: string;
  private viewerCount?: number;
  private game?: string;

  getDisplayName = () => this.displayName;
  getImage = () => this.image;
  getViewerCount = () => this.viewerCount;
  setViewerCount = (input: number) => (this.viewerCount = input);
  getGame = () => this.game;
  setGame = (input: string) => (this.game = input);
}
