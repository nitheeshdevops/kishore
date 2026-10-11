import React from 'react';
import { WeddingProvider } from './context/WeddingContext';
import { CinematicIntro } from './components/CinematicIntro/CinematicIntro';
import { Navbar } from './components/Navigation/Navbar';
import { CinematicHero } from './components/Hero/CinematicHero';
import { StoryTimeline } from './components/StoryTimeline/StoryTimeline';
import { RingExchange } from './components/RingExchange/RingExchange';
import { SunsetSpotlight } from './components/SunsetSpotlight/SunsetSpotlight';
import { PhotoGallery } from './components/PhotoGallery/PhotoGallery';
import { CinematicFilm } from './components/CinematicFilm/CinematicFilm';
import { Countdown } from './components/Countdown/Countdown';
import { WeddingEvents } from './components/WeddingEvents/WeddingEvents';
import { FamilyBlessings } from './components/FamilyBlessings/FamilyBlessings';
import { GuestWishes } from './components/GuestWishes/GuestWishes';
import { FinalScene } from './components/FinalScene/FinalScene';
import { ConfigDrawer } from './components/ConfigDrawer/ConfigDrawer';
import { BackgroundAudioBridge } from './components/Audio/BackgroundAudioBridge';
import './App.css';

const MainApp: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#1F070E] text-[#FFF8EF] overflow-x-hidden selection:bg-[#D8B779] selection:text-[#351018]">
      {/* Invisible YouTube Audio Stream Bridge (Official Wedding Song) */}
      <BackgroundAudioBridge />

      {/* 3D Cinematic Opening Sequence (Skippable & Replayable) */}
      <CinematicIntro />

      {/* Luxury Navigation Bar */}
      <Navbar />

      {/* Main Experience Flow */}
      <main>
        {/* Cinematic 3D Hero */}
        <CinematicHero />

        {/* Our Story Timeline */}
        <StoryTimeline />

        {/* 3D Sacred Ring Exchange Ceremony (20x Magic) */}
        <div id="ring-exchange">
          <RingExchange />
        </div>

        {/* Desert Sunset Couture Spotlight (Interactive 3D Tilt & Sunbeam Flare) */}
        <SunsetSpotlight />

        {/* Pre-Wedding Photo Gallery */}
        <PhotoGallery />

        {/* Cinematic Film Teaser */}
        <CinematicFilm />

        {/* Wedding Countdown */}
        <Countdown />

        {/* Wedding Details & Itinerary */}
        <WeddingEvents />

        {/* Family Blessings (Light Ivory Contrast Section) */}
        <FamilyBlessings />

        {/* Guest Wishes & Digital Guestbook */}
        <GuestWishes />

        {/* Romantic Final Scene & WhatsApp Share */}
        <FinalScene />
      </main>

      {/* Interactive Live Customizer Slide-over */}
      <ConfigDrawer />
    </div>
  );
};

export default function App() {
  return (
    <WeddingProvider>
      <MainApp />
    </WeddingProvider>
  );
}
