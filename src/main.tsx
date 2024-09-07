/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { createRoot } from "react-dom/client";
import { AgoraRTCProvider } from "agora-rtc-react";
import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import App from "./App";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }) as unknown as import("agora-rtc-react").IAgoraRTCClient;

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AgoraRTCProvider client={client}>
      <App />
    </AgoraRTCProvider>
  </React.StrictMode>
);
