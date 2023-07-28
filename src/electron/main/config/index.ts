import {app} from 'electron';
import path from 'path';
process.env.DIST = path.join('./dist');
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST);

const resolvePath = (...paths: string[]): string =>
  path.resolve(process.env.PUBLIC, ...paths);

export const IMAGE_DIRECTORY = resolvePath('images');
export const TEMPLATES_DIRECTORY = resolvePath('images', 'templates');
export const TEST_DIRECTORY = resolvePath('images', 'test');
export const DEFAULT_WINDOW_CAPTURE_PATH = resolvePath('images', 'image.bmp');
export const DEFAULT_WINDOW_NAME = `EVE - ${process.env.CHARACTER_NAME}`;

export const TEMPLATES = {
  inv: {
    imgs: Array.from({length: 5}, (_, i) =>
      resolvePath('images', 'templates', `inv${i + 1}.png`)
    ),
    mask: resolvePath('images', 'templates', 'inv_mask.png'),
  },
  searchBox: {
    imgs: Array.from({length: 2}, (_, i) =>
      resolvePath('images', 'templates', `search-box${i + 1}.png`)
    ),
  },
  undockButton: {
    imgs: [resolvePath('images', 'templates', 'undock-button.png')],
  },
  invTabs: {
    ship: {
      imgs: Array.from({length: 2}, (_, i) =>
        resolvePath('images', 'templates', `tabsShip${i + 1}.png`)
      ),
    },
    hangar: {
      imgs: Array.from({length: 3}, (_, i) =>
        resolvePath('images', 'templates', `tabsHangar${i + 1}.png`)
      ),
    },
    items: {
      imgs: Array.from({length: 2}, (_, i) =>
        resolvePath('images', 'templates', `tabsItems${i + 1}.png`)
      ),
    },
  },
};

export default {
  IMAGE_DIRECTORY,
  TEMPLATES_DIRECTORY,
  DEFAULT_WINDOW_CAPTURE_PATH,
  DEFAULT_WINDOW_NAME,
  TEMPLATES,
};
