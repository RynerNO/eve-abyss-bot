import {TEMPLATES} from '../../config';
import {jsonDB} from '../../db';
import {findTemplate} from '../../imageMathing';
import {draw} from '../../imageMathing/draw';
import {BoundingBox} from '../../imageMathing/types';
import {logger} from '../../logger';

interface positions {
  Ship: BoundingBox | null;
  Hangar: BoundingBox | null;
  Items: BoundingBox | null;
}
export class Tabs {
  positions: positions = {
    Ship: null,
    Hangar: null,
    Items: null,
  };
  constructor(positions: positions | null, inventoryPos?: BoundingBox | null) {
    if (positions === null) this.init(inventoryPos);
    else if (positions.Hangar === null) this.initHangarTab(inventoryPos);
    else if (positions.Items === null) this.initItemsTab(inventoryPos);
    else if (positions.Ship === null) this.initShipTab(inventoryPos);
    else this.positions = positions;
  }
  initShipTab(inventoryPos?: BoundingBox | null) {
    logger.debug('Try to locate ship tab');
    const Ship = findTemplate(TEMPLATES.invTabs.ship.imgs, inventoryPos);
    if (Ship === null) {
      logger.error('Ship tab not found');
    }
    logger.debug('Ship tab found');
    this.positions.Ship = Ship;
    jsonDB.push('/positions/tabs', this.positions);
  }
  initHangarTab(inventoryPos?: BoundingBox | null) {
    logger.debug('Try to locate hangar tab');
    const Hangar = findTemplate(TEMPLATES.invTabs.hangar.imgs, inventoryPos);
    if (Hangar === null) {
      logger.error('Hangar tab not found');
    }
    logger.debug('Hangar tab found');
    this.positions.Hangar = Hangar;
    jsonDB.push('/positions/tabs', this.positions);
  }
  initItemsTab(inventoryPos?: BoundingBox | null) {
    logger.debug('Try to locate items tab');
    const Items = findTemplate(TEMPLATES.invTabs.items.imgs, inventoryPos);
    if (Items === null) {
      logger.error('Items tab not found');
    }
    logger.debug('Items tab found');
    this.positions.Items = Items;
    jsonDB.push('/positions/tabs', this.positions);
  }
  init(inventoryPos?: BoundingBox | null) {
    this.initShipTab(inventoryPos);
    this.initHangarTab(inventoryPos);
    this.initItemsTab(inventoryPos);
    jsonDB.push('/positions/tabs', this.positions);
    return this;
  }
  public draw(imagePath: string) {
    if (!this.positions) return;
    if (this.positions.Hangar) draw(imagePath, this.positions.Hangar);
    if (this.positions.Items) draw(imagePath, this.positions.Items);
    if (this.positions.Ship) draw(imagePath, this.positions.Ship);
  }
}
