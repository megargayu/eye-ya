import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";

const BLINK_THRESHOLD = 0.25;

const dist = (x1, y1, x2, y2) => {
  return Math.hypot(x2 - x1, y2 - y1);
};

const getEAR = (upperEye, lowerEye) => {
  // Distance between top of eye and bottom of eye (vertical distance) - note there are 2 of these.
  const A = dist(
    upperEye[5][0],
    upperEye[5][1],
    lowerEye[4][0],
    lowerEye[4][1]
  );
  const B = dist(
    upperEye[3][0],
    upperEye[3][1],
    lowerEye[2][0],
    lowerEye[2][1]
  );

  // console.log(A, B);
  // Distance between left of eye and right of eye (horizontal distance).
  const horizontal = dist(
    upperEye[0][0],
    upperEye[0][1],
    upperEye[8][0],
    upperEye[8][1]
  );

  // Average A and B out and find their ratio with respect to horizontal.
  return (A + B) / (2 * horizontal);
};

// https://medium.com/the-web-tub/recognising-eye-blinking-with-tensorflow-js-3c02b738850d
export const predict = (face) => {
  if (!face) return null;

  // Right eye parameters
  const lowerRight = face.annotations.rightEyeUpper0;
  const upperRight = face.annotations.rightEyeLower0;
  const rightEAR = getEAR(upperRight, lowerRight);

  // Left eye parameters
  const lowerLeft = face.annotations.leftEyeUpper0;
  const upperLeft = face.annotations.leftEyeLower0;
  const leftEAR = getEAR(upperLeft, lowerLeft);

  // True if the eye is closed
  const blinked = leftEAR <= BLINK_THRESHOLD && rightEAR <= BLINK_THRESHOLD;
  return blinked;
};

export const loadModel = async () => {
  return await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
};
