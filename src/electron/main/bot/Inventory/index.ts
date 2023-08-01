import {captureAndSaveWindow, findTemplateWithMask} from '../../imageMathing';
import {logger} from '../../logger';
import {
  DEFAULT_WINDOW_CAPTURE_PATH,
  DEFAULT_WINDOW_NAME,
  TEMPLATES,
} from '../../config';
import {BoundingBox} from '../../imageMathing/types';
import {SearchBar} from './SearchBar';
import {Tabs} from './Tab';
import {draw} from '../../imageMathing/draw';
import {jsonDB} from '../../db';

class Inventory {
  position: BoundingBox | null = null;
  constructor(position: BoundingBox | null) {
    this.position = position;
    if (this.position === null) this.init();
  }
  public init() {
    captureAndSaveWindow(DEFAULT_WINDOW_NAME, DEFAULT_WINDOW_CAPTURE_PATH);
    const inventory = findTemplateWithMask(
      TEMPLATES.inv.imgs,
      TEMPLATES.inv.mask
    );
    if (inventory === null) {
      logger.error('Inventory not found');
    }
    logger.debug('Inventory found');
    this.position = inventory;
    jsonDB.push('/positions/inventory', this.position);
    return this;
  }
  public draw(imagePath: string) {
    if (!this.position) return;
    draw(imagePath, this.position);
  }
}

export {Inventory, SearchBar, Tabs};
