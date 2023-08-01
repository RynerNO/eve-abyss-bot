import {TEMPLATES} from '../../config';
import {findTemplate} from '../../imageMathing';
import {BoundingBox} from '../../imageMathing/types';
import {logger} from '../../logger';
import {draw} from '../../imageMathing/draw';
import {jsonDB} from '../../db';

export class Undock {
  private position: BoundingBox | null = null;
  constructor(position: BoundingBox | null) {
    if (position === null) this.init();
    else this.position = position;
  }
  init() {
    logger.debug('Try to locate undock button');
    const undock = findTemplate(TEMPLATES.undockButton.imgs);
    if (undock === null) {
      logger.error('Undock button not found');
    }
    logger.debug('Undock button found');
    this.position = undock;
    jsonDB.push('/positions/undock', this.position);
    return this;
  }
  public draw(imagePath: string) {
    if (!this.position) return;
    draw(imagePath, this.position);
  }
}
