import React, { createContext, useContext, useState, useEffect } from 'react';
import type { WeddingConfig } from '../types';
import { defaultWeddingConfig } from '../config/weddingConfig';

interface WeddingContextType {
  config: WeddingConfig;
  updateConfig: (updater: (prev: WeddingConfig) => WeddingConfig) => void;
  resetConfig: () => void;
  isPlayingMusic: boolean;
  toggleMusic: () => void;
  hasEnteredStory: boolean;
  setHasEnteredStory: (entered: boolean) => void;
  isIntroActive: boolean;
  setIsIntroActive: (active: boolean) => void;
  replayIntro: () => void;
  skipIntro: () => void;
  isConfigDrawerOpen: boolean;
  setIsConfigDrawerOpen: (open: boolean) => void;
  audioElement: HTMLAudioElement | null;
}

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

const STORAGE_KEY = 'kishore_shrika_wedding_v3';

export const WeddingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<WeddingConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultWeddingConfig, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load saved wedding config:', e);
    }
    return defaultWeddingConfig;
  });

  const [hasEnteredStory, setHasEnteredStory] = useState<boolean>(false);
  const [isIntroActive, setIsIntroActive] = useState<boolean>(true);
  const [isConfigDrawerOpen, setIsConfigDrawerOpen] = useState<boolean>(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  // Initialize background romantic audio element
  useEffect(() => {
    const audio = new Audio(config.audioTrack.url);
    audio.loop = true;
    audio.volume = 0.5;
    setAudioElement(audio);

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [config.audioTrack.url]);

  const toggleMusic = () => {
    if (!audioElement) return;

    if (isPlayingMusic) {
      audioElement.pause();
      setIsPlayingMusic(false);
    } else {
      audioElement.play().then(() => {
        setIsPlayingMusic(true);
      }).catch((err) => {
        console.warn('Audio play failed or was blocked by browser policy:', err);
      });
    }
  };

  const updateConfig = (updater: (prev: WeddingConfig) => WeddingConfig) => {
    setConfig((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn('Failed to persist config in local storage:', e);
      }
      return next;
    });
  };

  const resetConfig = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setConfig(defaultWeddingConfig);
  };

  const replayIntro = () => {
    setIsIntroActive(true);
    setHasEnteredStory(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const skipIntro = () => {
    setIsIntroActive(false);
    setHasEnteredStory(true);
  };

  return (
    <WeddingContext.Provider
      value={{
        config,
        updateConfig,
        resetConfig,
        isPlayingMusic,
        toggleMusic,
        hasEnteredStory,
        setHasEnteredStory,
        isIntroActive,
        setIsIntroActive,
        replayIntro,
        skipIntro,
        isConfigDrawerOpen,
        setIsConfigDrawerOpen,
        audioElement,
      }}
    >
      {children}
    </WeddingContext.Provider>
  );
};

export const useWedding = (): WeddingContextType => {
  const context = useContext(WeddingContext);
  if (!context) {
    throw new Error('useWedding must be used within a WeddingProvider');
  }
  return context;
};
