import path from 'path';
import {OpenCV as cv} from 'node-native-win-utils';
import {DEFAULT_WINDOW_CAPTURE_PATH, TEST_DIRECTORY} from '../config';
import {logger} from '../logger';
import {BoundingBox} from './types';
/**
 * Finds the template in the input image using the given mask and displays the matched region.
 * @param {string} inputImagePath Input image file path
 * @param {string} templateImagePaths Template image file path
 * @param {string} maskImagePath Mask image file path
 */
export function findTemplateWithMask(
  templateImagePaths: string[],
  maskImagePath: string
): null | BoundingBox {
  try {
    const inputImagePath = DEFAULT_WINDOW_CAPTURE_PATH;
    const inputImage = new cv(inputImagePath);
    const mask = new cv(maskImagePath);

    let bestMatch = {
      maxValue: -Infinity,
      topLeft: null as {x: number; y: number} | null,
      templateWidth: 0,
      templateHeight: 0,
    };

    templateImagePaths.forEach((templateImagePath: string) => {
      const templateImage = new cv(templateImagePath);
      const matchingResult = inputImage
        .blur(5, 5)
        .bgrToGray()
        .matchTemplate(
          templateImage.blur(5, 5).bgrToGray().imageData,
          null,
          mask.bgrToGray().imageData
        );

      const {maxValue, maxLocation} = matchingResult;

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
      inputImage.drawRectangle(
        [bestMatch.topLeft.x, bestMatch.topLeft.y],
        [
          bestMatch.topLeft.x + bestMatch.templateWidth,
          bestMatch.topLeft.y + bestMatch.templateHeight,
        ],
        [255, 0, 0],
        2
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
    logger.error('Error finding template with mask:', error);
    return null;
  }
  return null;
}
