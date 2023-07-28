import {jsonDB} from '../db';
import {Inventory, Tabs, SearchBar} from './Inventory';
import {Undock} from './Undock';

async function uiBuildHangar() {
  const inv_pos = await jsonDB.getObjectDefault('/positions/inventory', null);
  const inventory = new Inventory(inv_pos);
  const tabs_pos = await jsonDB.getObjectDefault('/positions/tabs', null);
  const tabs = new Tabs(tabs_pos, inventory.position);
  const searchBar_pos = await jsonDB.getObjectDefault(
    '/positions/searchBar',
    null
  );
  const searchBar = new SearchBar(searchBar_pos, inventory.position);
  const undock_pos = await jsonDB.getObjectDefault('/positions/undock', null);
  const undock = new Undock(undock_pos);
  return {inventory, tabs, searchBar, undock};
}

export {uiBuildHangar};
