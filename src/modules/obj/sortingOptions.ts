export class SortingOptions {
  constructor(orderBy: string, liveOnly: boolean) {
    this.orderBy = orderBy;
    this.liveOnly = liveOnly;
  }

  private orderBy!: string;
  private liveOnly!: boolean;

  getOrderBy = () => this.orderBy;
  setOrderBy = (input: string) => (this.orderBy = input);

  getLiveOnly = () => this.liveOnly;
  setLiveOnly = (input: boolean) => (this.liveOnly = input);
}
