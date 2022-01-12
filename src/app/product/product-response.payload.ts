export interface IFullProduct {
  abbreviatedTitle: string;
  brand: string;
  carts: [];
  description: string;
  modelNumber: string;
  owningOrder: number;
  price: number;
  productId: number;
  reviewList: [];
  title: string;
}

export interface IUltraFullProduct extends IFullProduct {
  //CPUs
  series?: string;
  l3Cache?: string;
  l2Cache?: string;
  coolingDevice?: string;
  manufacturingTech?: string;
  //Cases
  motherboardCompatibility?: string;
  frontPorts?: string;
  powerSupplyMounted?: string;
  sidePannelWindow?: string;
  fans?: string;
  internalDriveBays?: string;
  //Graphics cards
  coreClock?: string;
  maxResolution?: string;
  displayPort?: string;
  dvi?: string;
  hdmi?: string;
  cardDimensions?: string;
  //RAM
  caseLatency?: number;
  voltage?: string;
  multiChannelKit?: string;
  timing?: string;
  //SDDs
  maxSeqRead?: string;
  maxSeqWrite?: string;
  usedFor?: string;
  mttf?: string;
  kb4RandomRead?: string;
  kb4RandomWrite?: string;
  controller?: string;
  //Power Supplies
  //fans?: string; extant on cases
  mainConnector?: string;
  rails?: string;
  pciExpressConnector?: string;
  //HDDs
  height?: number;
  width?: number;
  length?: number;
  weight?: number;
  packageContents?: string;
  avereageLatency: number;
  //Motherboards
  memoryStandard?: string;
  numOfMemorySlots?: string;
  audioChipset?: string;
  onboardVideoChipset?: string;
  pciExpress?: string;
}
