import {
  captureAndSaveWindow,
  findTemplate,
  findTemplateWithMask,
} from "../../imageMathing";
import { logger } from "../../logger";
import {
  DEFAULT_WINDOW_CAPTURE_PATH,
  DEFAULT_WINDOW_NAME,
  TEMPLATES,
} from "../../config";
import { BoundingBox } from "../../imageMathing/types";
import { SearchBar } from "./SearchBar";
import { Tabs } from "./Tab";

export class Inventory {
  position: BoundingBox | null = null;
  searchBar: SearchBar = new SearchBar();
  tabs: Tabs = new Tabs();

  public init() {
    captureAndSaveWindow(DEFAULT_WINDOW_NAME, DEFAULT_WINDOW_CAPTURE_PATH);
    const inventory = findTemplateWithMask(
      TEMPLATES.inv.imgs,
      TEMPLATES.inv.mask
    );
    if (inventory === null) {
      logger.error("Inventory not found");
      return null;
    }
    logger.debug("Inventory found");
    this.position = inventory;
    this.searchBar.init(this.position);
    this.tabs.init(this.position);
  }
}
