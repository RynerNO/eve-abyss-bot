import { TEMPLATES } from "../../config";
import { findTemplate } from "../../imageMathing";
import { BoundingBox } from "../../imageMathing/types";
import { logger } from "../../logger";

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
  init(inventoryPos: BoundingBox) {
    // FIXME: Fix ship tab template image or create new one
    logger.debug("Try to locate ship tab");
    const Ship = findTemplate(TEMPLATES.invTabs.ship.imgs, inventoryPos);
    if (Ship === null) {
      logger.error("Ship tab not found");
      return null;
    }
    logger.debug("Ship tab found");
    this.positions.Ship = Ship;

    logger.debug("Try to locate hangar tab");
    const Hangar = findTemplate(TEMPLATES.invTabs.hangar.imgs, inventoryPos);
    if (Ship === null) {
      logger.error("Hangar tab not found");
      return null;
    }
    logger.debug("Hangar tab found");
    this.positions.Hangar = Hangar;

    logger.debug("Try to locate items tab");
    const Items = findTemplate(TEMPLATES.invTabs.items.imgs, inventoryPos);
    if (Items === null) {
      logger.error("Items tab not found");
      return null;
    }
    logger.debug("Items tab found");
    this.positions.Items = Items;
  }

  get ShipPosition() {
    return this.positions.Ship;
  }
  get HangarPosition() {
    return this.positions.Hangar;
  }
  get ItemsPosition() {
    return this.positions.Items;
  }
}
