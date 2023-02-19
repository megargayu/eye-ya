import { useEffect, useRef, useState } from "react";

import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";

import { drawAnnotations } from "./ai/draw";

import Webcam from "react-webcam";

const BLINK_THRESHOLD = 0.27;

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
  const blinked = leftEAR <= BLINK_THRESHOLD && rightEAR <= BLINK_THRESHOLD;
  return blinked;
};

const loadModel = async () => {
  return await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
};

const App = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);

  const lastBlinked = useRef(Date.now());
  const [msSinceBlink, setMsSinceBlink] = useState(0);

  const drowsyStart = useRef(null);
  const [msSinceDrowsy, setMsSinceDrowsy] = useState(0);

  const detect = async () => {
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
      drawAnnotations(face, ctx, [
        "leftEyeUpper0",
        "leftEyeLower0",
        "rightEyeUpper0",
        "rightEyeLower0",
      ]);
    });

    const blinked = predict(face[0]);

    if (blinked) {
      lastBlinked.current = Date.now();

      console.log("blinked");

      if (drowsyStart.current === null) {
        drowsyStart.current = Date.now();
        console.log("drowsy start");
      }
    } else {
      if (drowsyStart.current !== null) {
        drowsyStart.current = null;
        console.log("drowsy end");
      }      
    }
  };

  // loading the model
  useEffect(() => {
    if (
      typeof webcamRef.current === "undefined" || 
      !webcamRef.current ||
      webcamRef.current.video.readyState !== 4 ||
      !canvasRef.current
    )
      return;

    (async () => {
      console.log("loading model...");
      setModel(await loadModel());
      console.log("model loaded!");
    })();
  }, [webcamRef, canvasRef]);

  // starting the detector
  useEffect(() => {
    if (!model) return;

    const interval = setInterval(() => {
      detect();

      console.log(lastBlinked.current);
      setMsSinceBlink(Date.now() - lastBlinked.current);

      if (drowsyStart.current === null)
        setMsSinceDrowsy(null);
      else
        setMsSinceDrowsy(Date.now() - drowsyStart.current);
    }, 10);

    return () => clearInterval(interval);
  }, [model]);

  return (
    <>
      <div className="w-full h-[480px]">
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

      <h2 className="text-center text-3xl mt-3 font-bold text-red-600">
        Seconds since last blink: {Math.round(msSinceBlink / 1000)}
      </h2>
      <h2 className="text-center text-3xl mt-3 font-bold text-red-600">
        Seconds being drowsy: {Math.round(msSinceDrowsy / 1000)}
      </h2>
    </>
  );
};

export default App;
