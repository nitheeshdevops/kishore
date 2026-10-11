import React, { useEffect, useRef } from 'react';
import { useWedding } from '../../context/WeddingContext';

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export const BackgroundAudioBridge: React.FC = () => {
  const { config, isPlayingMusic } = useWedding();
  const playerRef = useRef<any>(null);
  const isReadyRef = useRef<boolean>(false);
  const youtubeId = config.audioTrack.youtubeId || 'FWH-fg0ZW-o';

  useEffect(() => {
    let checkInterval: any = null;

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      if (playerRef.current) return;

      try {
        playerRef.current = new window.YT.Player('bg-youtube-audio-frame', {
          height: '1',
          width: '1',
          videoId: youtubeId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            playlist: youtubeId,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: (event: any) => {
              isReadyRef.current = true;
              event.target.setVolume(85);
              if (isPlayingMusic) {
                event.target.playVideo();
              }
            },
            onError: (err: any) => {
              console.warn('YouTube audio error, falling back to HTML5 audio:', err);
            },
          },
        });
      } catch (e) {
        console.warn('Failed to initialize YouTube Audio Player:', e);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      checkInterval = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(checkInterval);
          initPlayer();
        }
      }, 300);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, [youtubeId]);

  // Sync play/pause state
  useEffect(() => {
    if (!playerRef.current || !isReadyRef.current) return;

    try {
      if (isPlayingMusic) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    } catch (e) {
      console.warn('Error syncing YouTube audio state:', e);
    }
  }, [isPlayingMusic]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: '-9999px',
        left: '-9999px',
        width: '1px',
        height: '1px',
        opacity: 0,
        pointerEvents: 'none',
        zIndex: -1,
      }}
    >
      <div id="bg-youtube-audio-frame" />
    </div>
  );
};
