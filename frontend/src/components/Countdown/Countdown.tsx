import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  Download,
  ExternalLink,
  Heart,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const Countdown: React.FC = () => {
  const { config } = useWedding();

  const calculateTimeLeft = (): TimeLeft => {
    const target = new Date(config.weddingDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds, isPast: false };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [config.weddingDate]);

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`${config.groom.firstName} & ${config.bride.firstName}'s Wedding`);
    const details = encodeURIComponent(config.invitationNote);
    const location = encodeURIComponent(config.events[2]?.venueName || 'Wedding Venue');
    
    // Format YYYYMMDDTHHmmssZ
    const d = new Date(config.weddingDate);
    const dateStr = d.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endDate = new Date(d.getTime() + 4 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, '');

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}/${endDate}&details=${details}&location=${location}`;
  };

  // Generate .ics file for Apple/Outlook/Desktop calendars
  const downloadIcs = () => {
    const title = `${config.groom.firstName} & ${config.bride.firstName}'s Wedding`;
    const d = new Date(config.weddingDate);
    const dateStr = d.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endDate = new Date(d.getTime() + 4 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, '');

    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Kishore Prewedding Experience//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${config.invitationNote}`,
      `LOCATION:${config.events[2]?.venueName || 'Wedding Venue'}`,
      `DTSTART:${dateStr}`,
      `DTEND:${endDate}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${config.groom.firstName}_Wedding.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#1F070E] overflow-hidden">
      {/* Decorative radial lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-burgundy-royal/20 via-gold-champagne/15 to-burgundy-royal/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Section Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-wine border border-gold-champagne/30 text-gold-champagne text-xs uppercase tracking-[0.25em] mb-4">
          <Clock className="w-3.5 h-3.5" />
          <span>Counting Down The Moments</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-cormorant font-bold text-gold-shimmer mb-4">
          Until Forever Begins
        </h2>

        <p className="text-base sm:text-lg text-rose-blush/80 font-cormorant italic max-w-2xl mx-auto mb-14">
          "{config.weddingDateFormatted}" • Timezone: {config.timezone}
        </p>

        {/* Countdown Grid Cards */}
        {timeLeft.isPast ? (
          <div className="p-10 rounded-3xl glass-wine border border-gold-champagne/40 max-w-2xl mx-auto">
            <Heart className="w-12 h-12 text-rose-antique fill-rose-antique mx-auto mb-4 animate-pulse" />
            <h3 className="text-3xl font-cormorant font-bold text-gold-shimmer mb-2">
              The Celebration of Forever Has Arrived!
            </h3>
            <p className="text-sm text-ivory-warm/80">
              Two hearts joined in sacred celebration. Thank you for showering Kishore and his beloved with endless love and blessings.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto mb-12">
            {timeUnits.map((unit, idx) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative group p-6 sm:p-8 rounded-2xl glass-burgundy border border-gold-champagne/30 shadow-burgundy-deep hover:border-gold-champagne transition-all duration-300"
              >
                {/* Glowing top line */}
                <div className="absolute top-0 inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-gold-champagne/60 to-transparent" />

                <div className="font-cormorant text-5xl sm:text-6xl md:text-7xl font-bold text-gold-shimmer tracking-tight">
                  {String(unit.value).padStart(2, '0')}
                </div>

                <div className="mt-2 text-xs sm:text-sm uppercase tracking-[0.25em] text-rose-blush font-medium">
                  {unit.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Calendar Integration Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full glass-wine border border-gold-champagne/40 text-gold-light hover:text-white hover:border-gold-champagne transition-all duration-300 flex items-center gap-2.5 text-xs uppercase tracking-widest font-medium"
          >
            <ExternalLink className="w-4 h-4 text-gold-champagne" />
            <span>Add to Google Calendar</span>
          </a>

          <button
            onClick={downloadIcs}
            className="px-6 py-3 rounded-full glass-wine border border-gold-champagne/40 text-gold-light hover:text-white hover:border-gold-champagne transition-all duration-300 flex items-center gap-2.5 text-xs uppercase tracking-widest font-medium"
          >
            <Download className="w-4 h-4 text-gold-champagne" />
            <span>Download iCal (.ics)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
