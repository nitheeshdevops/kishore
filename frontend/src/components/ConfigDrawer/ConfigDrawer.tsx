import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sliders,
  Save,
  RotateCcw,
  Copy,
  Check,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';

export const ConfigDrawer: React.FC = () => {
  const {
    config,
    updateConfig,
    resetConfig,
    isConfigDrawerOpen,
    setIsConfigDrawerOpen,
  } = useWedding();

  const [copied, setCopied] = useState(false);

  // Form states initialized with current config
  const [brideFirstName, setBrideFirstName] = useState(config.bride.firstName);
  const [brideFullName, setBrideFullName] = useState(config.bride.fullName);
  const [weddingDate, setWeddingDate] = useState(config.weddingDate.substring(0, 16));
  const [weddingDateFormatted, setWeddingDateFormatted] = useState(config.weddingDateFormatted);
  const [hashtag, setHashtag] = useState(config.hashtag);
  const [subtagline, setSubtagline] = useState(config.subtagline);

  if (!isConfigDrawerOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig((prev) => ({
      ...prev,
      bride: {
        ...prev.bride,
        firstName: brideFirstName.trim() || '[Bride]',
        fullName: brideFullName.trim() || '[Bride’s Full Name]',
      },
      weddingDate: weddingDate ? new Date(weddingDate).toISOString() : prev.weddingDate,
      weddingDateFormatted: weddingDateFormatted.trim() || prev.weddingDateFormatted,
      hashtag: hashtag.trim() || prev.hashtag,
      subtagline: subtagline.trim() || prev.subtagline,
    }));
    setIsConfigDrawerOpen(false);
  };

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsConfigDrawerOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative z-50 w-full max-w-md h-full glass-burgundy border-l border-gold-champagne/40 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl"
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gold-champagne/20 mb-6">
              <div className="flex items-center gap-2 text-gold-champagne">
                <Sliders className="w-5 h-5" />
                <h3 className="font-cormorant text-2xl font-bold text-gold-light">
                  Live Customizer
                </h3>
              </div>
              <button
                onClick={() => setIsConfigDrawerOpen(false)}
                className="p-2 rounded-full glass-wine text-gold-light hover:text-white"
                aria-label="Close customizer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-rose-blush/80 mb-6">
              Personalize Kishore's pre-wedding experience live. Changes take effect across 3D scenes, countdown, and headers instantly.
            </p>

            {/* Customization Form */}
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              {/* Groom's Name (Fixed per prompt instruction) */}
              <div>
                <label className="block text-gold-champagne font-semibold uppercase tracking-wider mb-1">
                  Groom's Name (Master)
                </label>
                <input
                  type="text"
                  disabled
                  value={config.groom.firstName}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-gold-champagne/20 text-gold-champagne/70 cursor-not-allowed"
                />
              </div>

              {/* Bride's Name (Configurable) */}
              <div>
                <label className="block text-gold-champagne font-semibold uppercase tracking-wider mb-1">
                  Bride's First Name
                </label>
                <input
                  type="text"
                  value={brideFirstName}
                  onChange={(e) => setBrideFirstName(e.target.value)}
                  placeholder="e.g. Ananya"
                  className="w-full px-3 py-2 rounded-lg bg-[#2C1019] border border-gold-champagne/40 text-ivory-warm focus:outline-none focus:border-gold-champagne"
                />
              </div>

              <div>
                <label className="block text-gold-champagne font-semibold uppercase tracking-wider mb-1">
                  Bride's Full Name
                </label>
                <input
                  type="text"
                  value={brideFullName}
                  onChange={(e) => setBrideFullName(e.target.value)}
                  placeholder="e.g. Ananya Roy"
                  className="w-full px-3 py-2 rounded-lg bg-[#2C1019] border border-gold-champagne/40 text-ivory-warm focus:outline-none focus:border-gold-champagne"
                />
              </div>

              {/* Wedding Date */}
              <div>
                <label className="block text-gold-champagne font-semibold uppercase tracking-wider mb-1">
                  Wedding Date &amp; Time (Countdown)
                </label>
                <input
                  type="datetime-local"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#2C1019] border border-gold-champagne/40 text-ivory-warm focus:outline-none focus:border-gold-champagne"
                />
              </div>

              {/* Formatted Display Date */}
              <div>
                <label className="block text-gold-champagne font-semibold uppercase tracking-wider mb-1">
                  Formatted Display Date
                </label>
                <input
                  type="text"
                  value={weddingDateFormatted}
                  onChange={(e) => setWeddingDateFormatted(e.target.value)}
                  placeholder="e.g. Sunday, February 14, 2027"
                  className="w-full px-3 py-2 rounded-lg bg-[#2C1019] border border-gold-champagne/40 text-ivory-warm focus:outline-none focus:border-gold-champagne"
                />
              </div>

              {/* Hashtag */}
              <div>
                <label className="block text-gold-champagne font-semibold uppercase tracking-wider mb-1">
                  Wedding Hashtag
                </label>
                <input
                  type="text"
                  value={hashtag}
                  onChange={(e) => setHashtag(e.target.value)}
                  placeholder="#KishoreWedsForever"
                  className="w-full px-3 py-2 rounded-lg bg-[#2C1019] border border-gold-champagne/40 text-ivory-warm focus:outline-none focus:border-gold-champagne"
                />
              </div>

              {/* Subtagline */}
              <div>
                <label className="block text-gold-champagne font-semibold uppercase tracking-wider mb-1">
                  Tagline / Vow Whisper
                </label>
                <input
                  type="text"
                  value={subtagline}
                  onChange={(e) => setSubtagline(e.target.value)}
                  placeholder="Two hearts. One journey. A story forever."
                  className="w-full px-3 py-2 rounded-lg bg-[#2C1019] border border-gold-champagne/40 text-ivory-warm focus:outline-none focus:border-gold-champagne"
                />
              </div>

              {/* Action buttons */}
              <div className="pt-4 flex items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-gold-champagne to-gold-light text-[#2C1B1B] font-semibold flex items-center justify-center gap-2 shadow-gold-glow"
                >
                  <Save className="w-4 h-4" />
                  <span>Apply Changes</span>
                </button>

                <button
                  type="button"
                  onClick={resetConfig}
                  className="p-2.5 rounded-lg glass-wine border border-gold-champagne/30 text-rose-blush hover:text-white"
                  title="Reset to Defaults"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Export Config */}
          <div className="mt-8 pt-4 border-t border-gold-champagne/20">
            <button
              onClick={handleCopyConfig}
              className="w-full py-2 rounded-lg glass-wine border border-gold-champagne/30 text-gold-light hover:text-white flex items-center justify-center gap-2 text-xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gold-champagne" />
                  <span>Copy Configuration JSON</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
