import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish,
  useRemoteUsers,
} from 'agora-rtc-react';
import '../basics.css';

const Basics = () => {
  const [calling, setCalling] = useState(false);
  const [appId, setAppId] = useState('594499cb27d34ca38f1cd67ddc875975'); // Tu App ID
  const [channel, setChannel] = useState('testChannel'); // Nombre del canal
  const [token, setToken] = useState(''); // Token estático

  const [micOn, setMicOn] = useState(true); // Estado del micrófono
  const [cameraOn, setCameraOn] = useState(true); // Estado de la cámara

  useEffect(() => {
    if (calling) {
      // Configura el token estático manualmente
      axios.get(`http://localhost:3000/agora/static-token`, {
        params: {
          channel: channel,
          uid: 12345, // UID de usuario
          role: 'publisher' // O 'subscriber'
        }
      })
      .then(response => {
        setToken(response.data);
      })
      .catch(error => {
        console.error('Error al obtener el token:', error);
      });
    }
  }, [calling, channel]);

  // Hook para unirse al canal
  useJoin({ appid: appId, channel: channel, token: token || null }, calling);

  // Hook para obtener las pistas locales
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  // Publicar las pistas locales
  usePublish([localMicrophoneTrack, localCameraTrack]);

  // Hook para obtener los usuarios remotos
  const remoteUsers = useRemoteUsers();
  const isConnected = useIsConnected();

  return (
    <>
      <div className="room">
        {isConnected ? (
          <div className="user-list">
            <div className="user">
              <LocalUser
                audioTrack={localMicrophoneTrack}
                cameraOn={cameraOn}
                micOn={micOn}
                videoTrack={localCameraTrack}
                cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
              >
                <samp className="user-name">You</samp>
              </LocalUser>
            </div>
            {remoteUsers.map((user) => (
              <div className="user" key={user.uid}>
                <RemoteUser
                  cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                  user={user}
                >
                  <samp className="user-name">{user.uid}</samp>
                </RemoteUser>
              </div>
            ))}
          </div>
        ) : (
          <div className="join-room">
            <img alt="agora-logo" className="logo" />
            <input
              onChange={(e) => setAppId(e.target.value)}
              placeholder="<Your app ID>"
              value={appId}
            />
            <input
              onChange={(e) => setChannel(e.target.value)}
              placeholder="<Your channel Name>"
              value={channel}
            />
            <input
              onChange={(e) => setToken(e.target.value)}
              placeholder="<Your token>"
              value={token}
              disabled
            />
            <button
              className={`join-channel ${!appId || !channel ? 'disabled' : ''}`}
              disabled={!appId || !channel}
              onClick={() => setCalling(true)}
            >
              <span>Join Channel</span>
            </button>
          </div>
        )}
      </div>
      {isConnected && (
        <div className="control">
          <div className="left-control">
            <button className="btn" onClick={() => setMicOn((prev) => !prev)}>
              <i className={`i-microphone ${!micOn ? 'off' : ''}`} />
            </button>
            <button className="btn" onClick={() => setCameraOn((prev) => !prev)}>
              <i className={`i-camera ${!cameraOn ? 'off' : ''}`} />
            </button>
          </div>
          <button
            className={`btn btn-phone ${calling ? 'btn-phone-active' : ''}`}
            onClick={() => setCalling((prev) => !prev)}
          >
            {calling ? <i className="i-phone-hangup" /> : <i className="i-mdi-phone" />}
          </button>
        </div>
      )}
    </>
  );
};

export default Basics;
