import { useEffect, useRef, useState } from "react";

import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";

import { drawAnnotations } from "./ai/draw";

import Webcam from "react-webcam";

const EAR_THRESHOLD = 0.27;

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
const predict = (face) => {
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
  const blinked = leftEAR <= EAR_THRESHOLD && rightEAR <= EAR_THRESHOLD;
  return blinked;
};

const loadModel = async () => {
  return await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
};

const App = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const detect = async (model) => {
    if (
      !webcamRef.current ||
      webcamRef.current.video.readyState !== 4 ||
      !canvasRef.current
    )
      return;

    // Get Video Properties
    const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set video width
    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    // Set canvas width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const face = await model.estimateFaces({ input: video });
    const ctx = canvasRef.current.getContext("2d");

    requestAnimationFrame(() => {
      drawAnnotations(face, ctx, ["leftEyeUpper0", "leftEyeLower0", "rightEyeUpper0", "rightEyeLower0"]);
    });

    if (predict(face[0]))
      console.log("blinked")
  };

  useEffect(() => {
    if (
      !webcamRef.current ||
      webcamRef.current.video.readyState !== 4 ||
      !canvasRef.current
    )
      return;

    (async () => {
      const model = await loadModel();

      console.log("model loaded");
      await detect(model);
    })();
  }, [webcamRef, canvasRef]);

  useEffect(() => {
    let interval;

    (async () => {
      const model = await loadModel();

      interval = setInterval(() => {
        detect(model);
      }, 10);
    })();

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="w-52 h-52">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 100,
            width: 640,
            height: 480,
          }}
        />
      </div>
    </>
  );
};

export default App;
