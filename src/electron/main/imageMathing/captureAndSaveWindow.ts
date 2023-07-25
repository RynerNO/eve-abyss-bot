import path from 'path';
import { captureWindow } from 'node-native-win-utils';

/**
 * Captures a screenshot of the specified window and saves it as an image file.
 * @param {string} windowsName Window name
 * @param {string} outputFilePath Output image file path
 */
export function captureAndSaveWindow(
	windowName: string,
	outputFilePath: string
): void {
	try {
		captureWindow(windowName, path.resolve(outputFilePath));
	} catch (error) {
		console.error('Error capturing window:', error);
	}
}
