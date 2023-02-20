import { useState, useRef, useEffect } from "react";

import { loadModel, predict } from "../ai/model";
import { drawAnnotations } from "../ai/draw";

import timeConverter from "../utils/timeConverter";

import Webcam from "react-webcam";

import Modal from "../components/Modal";

import StopIcon from "../components/StopIcon";
import PlayIcon from "../components/PlayIcon";

const FocusMode = () => {
  const [inFocusMode, setInFocusMode] = useState(false);
  const focusModeStart = useRef(Date.now());
  const [timeSinceFocusMode, setTimeSinceFocusMode] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSinceFocusMode(Date.now() - focusModeStart.current);
    });

    return () => clearInterval(interval);
  }, []);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);

  const lastBlinked = useRef(Date.now());
  const [msSinceBlink, setMsSinceBlink] = useState(0);

  const drowsyStart = useRef(null);
  const [msSinceDrowsy, setMsSinceDrowsy] = useState(0);

  const [hasPermissions, setHasPermissions] = useState(false);
  const [showData, setShowData] = useState(false);

  const sinceSeenFace = useRef(Date.now());
  const sinceLastNotification = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const videoPermission = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        const notificationPermission = await Notification.requestPermission();

        if (videoPermission && notificationPermission) setHasPermissions(true);
      } catch (e) {}
    })();
  }, []);

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

    if (face.length === 0) return;

    sinceSeenFace.current = Date.now();
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
    (async () => {
      console.log("loading model...");
      setModel(await loadModel());
      console.log("model loaded!");
    })();
  }, []);

  // starting the detector
  useEffect(() => {
    if (!inFocusMode) return;

    const interval = setInterval(() => {
      detect();

      setMsSinceBlink(Date.now() - lastBlinked.current);

      if (drowsyStart.current === null) setMsSinceDrowsy(null);
      else setMsSinceDrowsy(Date.now() - drowsyStart.current);
    }, 10);

    return () => clearInterval(interval);
  }, [inFocusMode]);

  // notification handler
  useEffect(() => {
    // don't show a notification until 5 minutes have passed
    if (
      sinceLastNotification.current !== null &&
      Date.now() - sinceLastNotification.current < 5 * 60_000
    )
      return;

    // haven't seen face in 10 seconds.
    if (Date.now() - sinceSeenFace.current > 10_000) {
      new Notification("Eye-ya! can't see your face.", {
        body: "Make sure your face is clearly visible to the webcam.",
      });

      sinceLastNotification.current = Date.now();
    }

    // something is wrong, usually you don't not blink for 10 seconds!
    if (msSinceBlink > 10_000) {
      new Notification(
        "Eye-ya! has detected you haven't blinked in more than 10 seconds.",
        {
          body: "Focusing for too long can cause eye strain. Take a break!",
        }
      );

      sinceLastNotification.current = Date.now();
    }

    // after 10 seconds of drowsy eyes
    if (msSinceDrowsy > 10_000) {
      new Notification("Eye-ya! has detected that you have become drowsy.", {
        body: "You can't work your best when you're tired. Take a break and relax!",
      });

      sinceLastNotification.current = Date.now();
    }
  }, [msSinceBlink]);

  return !hasPermissions ? (
    <div className="flex justify-center items-center h-[calc(100%-7rem)]">
      <h1 className="text-3xl font-bold text-white">
        Please enable permissions for accessing the camera and notifications.
      </h1>
    </div>
  ) : (
    <>
      <div className="w-full h-[calc(100%-7rem)] flex flex-col justify-center items-center space-y-10">
        {inFocusMode ? (
          <h2 className="text-white text-6xl">
            {Math.floor((timeSinceFocusMode / 1000 / 60 / 60) % 24)
              .toString()
              .padStart(2, "0")}
            :
            {Math.floor((timeSinceFocusMode / 1000 / 60) % 60)
              .toString()
              .padStart(2, "0")}
            :
            {Math.floor((timeSinceFocusMode / 1000) % 60)
              .toString()
              .padStart(2, "0")}
          </h2>
        ) : (
          <h2 className="text-white text-6xl">00:00:00</h2>
        )}
        <button
          disabled={!model}
          className="rounded-full w-64 h-64 bg-cyan-500 flex justify-center items-center disabled:bg-gray-500"
          onClick={() => {
            console.log("hi");
            if (!inFocusMode) {
              focusModeStart.current = Date.now();
              setMsSinceBlink(0);
              lastBlinked.current = Date.now();
              sinceSeenFace.current = Date.now();
            }

            setInFocusMode(!inFocusMode);
          }}
        >
          {inFocusMode ? (
            <StopIcon className="w-48 h-48" />
          ) : (
            <PlayIcon className="w-48 h-48" />
          )}
        </button>

        <button
          disabled={!inFocusMode}
          className="rounded-full w-64 p-2 text-white bg-blue-500 font-bold disabled:bg-gray-500 disabled:text-gray-800"
          onClick={() => setShowData(true)}
        >
          See Data
        </button>
      </div>

      <Modal shown={showData} setShown={setShowData}>
        <div className="w-[330px] h-[250px] border-[5px] border-slate-900">
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
              width: 320,
              height: 240,
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
              width: 320,
              height: 240,
            }}
          />
        </div>

        <h2 className="text-center text-3xl mt-3 font-bold text-cyan-600">
          You have not blinked for {Math.round(msSinceBlink / 1000)} seconds.
        </h2>
        <h2 className="text-center text-3xl mt-3 font-bold text-cyan-600">
          You have been drowsy for {Math.round(msSinceDrowsy / 1000)} seconds.
        </h2>
      </Modal>
    </>
  );
};

export default FocusMode;
