import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MarigoldPetals from './components/MarigoldPetals';
import HeroSection from './components/HeroSection';
import RakhiCeremony from './components/RakhiCeremony';
import BondStory from './components/BondStory';
import TeddyCompanion from './components/TeddyCompanion';
import PromisesVault from './components/PromisesVault';
import SisterReplyBox from './components/SisterReplyBox';
import Footer from './components/Footer';
import TeddyHugModal from './components/TeddyHugModal';
import LoginModal from './components/LoginModal';
import FloatingMusicPlayer from './components/FloatingMusicPlayer';

export default function App() {
  // Check if sister has already logged in previously
  const savedSisterName = typeof window !== 'undefined' ? localStorage.getItem('rakhi_sister_user') : null;
  const isSessionUnlocked = typeof window !== 'undefined' && sessionStorage.getItem('rakhi_session_unlocked') === 'true';
  
  const [sisterName, setSisterName] = useState(savedSisterName || 'Saty');
  // Always display after opening this website; once opened and name is written, after reload don't show it again
  const [isLoginOpen, setIsLoginOpen] = useState(!isSessionUnlocked);
  const savedHugs = typeof window !== 'undefined' ? parseInt(localStorage.getItem('rakhi_hugs_count') || '1', 10) : 1;
  const [hugsCount, setHugsCount] = useState(savedHugs || 1);
  const [isHugModalOpen, setIsHugModalOpen] = useState(false);

  // Fetch initial stats from backend (if available)
  useEffect(() => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.hugsCount === 'number') {
          setHugsCount(data.hugsCount);
          localStorage.setItem('rakhi_hugs_count', data.hugsCount.toString());
        }
      })
      .catch((err) => {
        // Static hosting mode (e.g. Netlify)
      });
  }, []);

  // Handle Sister Login and replicate credential into sisterName
  const handleLogin = (name) => {
    const trimmed = name.trim();
    if (trimmed) {
      setSisterName(trimmed);
      localStorage.setItem('rakhi_sister_user', trimmed);
    }
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('rakhi_session_unlocked', 'true');
    }
    setIsLoginOpen(false);
  };

  // Handler to send hug
  const handleSendHug = async () => {
    setHugsCount((prev) => {
      const next = prev + 1;
      localStorage.setItem('rakhi_hugs_count', next.toString());
      return next;
    });

    try {
      const res = await fetch('/api/hug', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        if (data.hugsCount) {
          setHugsCount(data.hugsCount);
          localStorage.setItem('rakhi_hugs_count', data.hugsCount.toString());
        }
      }
    } catch (e) {
      // Local state and localStorage already updated
    }
  };

  // Handler for tying Rakhi
  const handleRakhiTied = async () => {
    try {
      await fetch('/api/tie-rakhi', { method: 'POST' });
    } catch (e) {
      console.warn('Rakhi recorded locally:', e);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative flex flex-col font-sans festive-bg-pattern selection:bg-rose-500 selection:text-white">
      {/* Floating Marigold Petals Atmosphere */}
      <MarigoldPetals />

      {/* Top Navbar */}
      <Navbar
        sisterName={sisterName}
        onOpenLogin={() => setIsLoginOpen(true)}
        hugsCount={hugsCount}
      />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* 1. Grand Hero Section */}
        <HeroSection
          sisterName={sisterName}
          onOpenHugModal={() => setIsHugModalOpen(true)}
        />

        {/* 2. Interactive Rakhi & Aarti Ceremony */}
        <RakhiCeremony
          sisterName={sisterName}
          onRakhiTied={handleRakhiTied}
        />

        {/* 3. Emotional "Bond Beyond Blood" Letter */}
        <BondStory
          sisterName={sisterName}
        />

        {/* 4. Cute Interactive Teddy Bear Companion */}
        <TeddyCompanion
          sisterName={sisterName}
          onSendHug={handleSendHug}
          hugsCount={hugsCount}
        />

        {/* 5. Brother's 5 Sacred Vows (Promises Vault) */}
        <PromisesVault
          sisterName={sisterName}
        />

        {/* 6. Sister's Reply Box with Direct Email to utkarsh0420nikam@gmail.com */}
        <SisterReplyBox
          sisterName={sisterName}
          onNewMessage={() => {}}
        />
      </main>

      {/* Footer */}
      <Footer
        sisterName={sisterName}
        onOpenHugModal={() => setIsHugModalOpen(true)}
      />

      {/* Giant Teddy Bear Hug Modal */}
      <TeddyHugModal
        isOpen={isHugModalOpen}
        onClose={() => setIsHugModalOpen(false)}
        sisterName={sisterName}
        onSendHug={handleSendHug}
        hugsCount={hugsCount}
      />

      {/* Sister Login & Name Replication Modal Gate */}
      <LoginModal
        isOpen={isLoginOpen}
        onLogin={handleLogin}
        initialName={savedSisterName || ''}
        onClose={isSessionUnlocked || savedSisterName ? () => setIsLoginOpen(false) : undefined}
      />

      {/* Floating Marathi Music Controller (Tula Japnar Aahe) */}
      <FloatingMusicPlayer />
    </div>
  );
}
