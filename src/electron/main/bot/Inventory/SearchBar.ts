import {TEMPLATES} from '../../config';
import {findTemplate} from '../../imageMathing';
import {BoundingBox} from '../../imageMathing/types';
import {logger} from '../../logger';

export class SearchBar {
  private position: BoundingBox | null = null;
  init(inventoryPos: BoundingBox) {
    logger.debug('Try to locate search bar');
    const searchBar = findTemplate(TEMPLATES.searchBox.imgs, inventoryPos);
    if (searchBar === null) {
      logger.error('Search bar not found');
      return null;
    }
    logger.debug('Search bar found');
    this.position = searchBar;

    return true;
  }

  get SearchBarPosition() {
    return this.position;
  }
}
