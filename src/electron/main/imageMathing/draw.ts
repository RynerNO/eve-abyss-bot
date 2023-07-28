import {OpenCV} from 'node-native-win-utils';
import {BoundingBox} from './types';

export function draw(imagePath: string, position: BoundingBox) {
  new OpenCV(imagePath)
    .drawRectangle(
      [position.x, position.y],
      [position.x + position.width, position.y + position.height],
      [255, 0, 0],
      2
    )
    .imwrite(imagePath);
}
