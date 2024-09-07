import React, { useRef, useEffect, ReactNode } from 'react';
import { IMicrophoneAudioTrack, ICameraVideoTrack } from 'agora-rtc-sdk-ng';
import '../localuser.css';

interface LocalUserProps {
  audioTrack: IMicrophoneAudioTrack | null;
  videoTrack: ICameraVideoTrack | null;
  cameraOn: boolean;
  micOn: boolean;
  cover: string;
  children: ReactNode;
}

const LocalUser: React.FC<LocalUserProps> = ({
  audioTrack,
  videoTrack,
  cameraOn,
  micOn,
  cover,
  children,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && videoTrack) {
      videoTrack.play(videoRef.current);
    }
    return () => {
      if (videoTrack) {
        videoTrack.stop();
      }
    };
  }, [videoTrack]);

  return (
    <div className="local-user">
      <div className={`video-container ${cameraOn ? "camera-on" : "camera-off"}`}>
        <video ref={videoRef} autoPlay muted playsInline />
        {!cameraOn && <img src={cover} alt="cover" className="cover-image" />}
      </div>
      <div className={`audio-indicator ${micOn ? "mic-on" : "mic-off"}`} />
      <div className="user-info">
        {children}
        {audioTrack && <div className="audio-track-status">Audio On</div>}
      </div>
    </div>
  );
};

export default LocalUser;
