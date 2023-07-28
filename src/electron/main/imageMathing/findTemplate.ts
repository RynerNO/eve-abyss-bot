import path from "path";
import { ROI, OpenCV as cv } from "node-native-win-utils";
import { DEFAULT_WINDOW_CAPTURE_PATH, TEST_DIRECTORY } from "../config";
import { logger } from "../logger";
import { BoundingBox } from "./types";
/**
 * Finds the template in the input image and displays the matched region.
 * @param {string} inputImagePath Input image file path
 * @param {string} templateImagePaths Template image file path
 */
export function findTemplate(
  templateImagePaths: string[],
  roi?: BoundingBox
): null | BoundingBox {
  try {
    const inputImagePath = DEFAULT_WINDOW_CAPTURE_PATH;
    const inputImage = new cv(inputImagePath);

    let bestMatch = {
      maxValue: -Infinity,
      topLeft: null as { x: number; y: number } | null,
      templateWidth: 0,
      templateHeight: 0,
    };
    let i = 0;
    templateImagePaths.forEach((templateImagePath: string) => {
      console.log(templateImagePath);
      const templateImage = new cv(templateImagePath);
      const searchArea = roi
        ? inputImage.getRegion([roi.x, roi.y, roi.width, roi.height])
        : inputImage;
      const matchingResult = searchArea
        .blur(5, 5)
        .bgrToGray()
        .matchTemplate(templateImage.blur(5, 5).bgrToGray().imageData);

      let { maxValue, maxLocation } = matchingResult;
      if (roi) {
        inputImage
          .getRegion([roi.x, roi.y, roi.width, roi.height])
          .imwrite(path.resolve(TEST_DIRECTORY, `matched${1111}.png`));
        maxLocation.x = maxLocation.x + roi.x;
        maxLocation.y = maxLocation.y + roi.y;
      }

      templateImage
        .blur(5, 5)
        .bgrToGray()
        .imwrite(path.resolve(TEST_DIRECTORY, `template${++i}.png`));
      if (maxValue > bestMatch.maxValue) {
        bestMatch = {
          maxValue,
          topLeft: maxLocation,
          templateWidth: templateImage.width,
          templateHeight: templateImage.height,
        };
      }
    });
    logger.debug(inputImagePath);
    logger.debug(`Best match max value: ${bestMatch.maxValue}`);
    if (bestMatch.maxValue < 0.54) {
      return null;
    }
    if (bestMatch.topLeft) {
      inputImage
        .drawRectangle(
          [bestMatch.topLeft.x, bestMatch.topLeft.y],
          [
            bestMatch.topLeft.x + bestMatch.templateWidth,
            bestMatch.topLeft.y + bestMatch.templateHeight,
          ],
          [255, 0, 0],
          2
        )
        .imwrite(
          path.resolve(TEST_DIRECTORY, `matched${bestMatch.maxValue}.png`)
        );
      const boundingBox = {
        x: bestMatch.topLeft.x,
        y: bestMatch.topLeft.y,
        width: bestMatch.templateWidth,
        height: bestMatch.templateHeight,
      };
      return boundingBox;
    }
  } catch (error) {
    logger.error(`Error finding template: ${error}`);
    return null;
  }
  return null;
}
