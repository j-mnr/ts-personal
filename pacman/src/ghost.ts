class Ghost {
  private isScared = false;
  public timerId = NaN;
  public currIdx: number;
  constructor(
    public readonly className: string,
    public readonly startIdx: number,
    public readonly speed: number
  ) {
    this.currIdx = startIdx;
  }

  toggleScared(): void {
    this.isScared = !this.isScared;
  }
}
export default Ghost;
