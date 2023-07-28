import {TEMPLATES} from '../../config';
import {findTemplate} from '../../imageMathing';
import {BoundingBox} from '../../imageMathing/types';
import {logger} from '../../logger';
import {draw} from '../../imageMathing/draw';
import {jsonDB} from '../../db';

export class SearchBar {
  private position: BoundingBox | null = null;
  constructor(position: BoundingBox | null, inventoryPos?: BoundingBox | null) {
    this.position = position;
    if (this.position === null) this.init(inventoryPos);
  }
  init(inventoryPos?: BoundingBox | null) {
    logger.debug('Try to locate search bar');
    const searchBar = findTemplate(TEMPLATES.searchBox.imgs, inventoryPos);
    if (searchBar === null) {
      logger.error('Search bar not found');
    }
    logger.debug('Search bar found');
    this.position = searchBar;
    jsonDB.push('/positions/searchBar', this.position);
    return this;
  }
  public draw(imagePath: string) {
    if (!this.position) return;
    draw(imagePath, this.position);
  }
}
