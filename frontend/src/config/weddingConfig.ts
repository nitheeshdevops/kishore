import type { WeddingConfig } from '../types';

/**
 * WEDDING CONFIGURATION
 * -------------------------------------------------------------
 * Centralized configuration for the pre-wedding experience.
 * Primary Groom: KISHORE
 * Bride's Name & Details: Configurable placeholders as requested.
 * Replace or customize any of these fields to update the entire experience.
 */
export const defaultWeddingConfig: WeddingConfig = {
  groom: {
    firstName: 'KISHORE',
    fullName: 'Kishore',
    title: 'The Groom',
    bio: 'An adventurous soul with a passionate heart, ready to embark on life’s greatest journey.',
    parents: 'Son of [Groom’s Parents]',
  },
  bride: {
    // Configurable bride placeholder - easily editable
    firstName: '[Bride]',
    fullName: '[Bride’s Full Name]',
    title: 'The Bride',
    bio: 'Graceful, radiant, and bringing warmth to every moment, ready to walk hand in hand forever.',
    parents: 'Daughter of [Bride’s Parents]',
  },
  // Configurable future wedding date for the live countdown
  weddingDate: '2027-02-14T10:30:00+05:30',
  weddingDateFormatted: 'Sunday, February 14, 2027',
  timezone: 'Asia/Kolkata',
  hashtag: '#KishoreWedsForever',
  tagline: 'A BEAUTIFUL BEGINNING',
  subtagline: 'Two hearts. One journey. A story forever.',
  invitationNote: 'With the blessings of our parents and loved ones, we invite you to join us as we celebrate the beginning of our eternal journey together.',
  
  // Audio configuration
  audioTrack: {
    title: 'A Thousand Whispers of Eternity',
    artist: 'Cinematic Orchestral Serenade',
    // Royalty-free romantic orchestral audio stream or synthesized ambient audio
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3',
  },

  // Video teaser configuration
  videoTeaser: {
    title: 'KISHORE — The Pre-Wedding Film',
    subtitle: 'A glimpse into our moments of laughter, whispered promises, and timeless romance',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80',
    duration: '3:45 MINS',
  },

  shareMessage: 'You are cordially invited to celebrate the union of Kishore and his beloved! Join us in experiencing our love story.',
  websiteUrl: window.location ? window.location.href : 'https://kishore-prewedding.love',

  // Story Timeline Milestones
  milestones: [
    {
      id: 'milestone-1',
      year: '2022',
      date: 'Autumn Evening',
      title: 'The First Encounter',
      subtitle: 'Where Two Worlds Collided',
      description: 'A serendipitous meeting that turned an ordinary afternoon into an unforgettable beginning. In that single conversation, time seemed to stand still.',
      location: 'The Garden Café',
      imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      quote: '"The universe conspired the moment our eyes met."',
    },
    {
      id: 'milestone-2',
      year: '2023',
      date: 'Summer Solstice',
      title: 'Cherished Memories',
      subtitle: 'Sunsets, Laughter, and Long Conversations',
      description: 'Countless drives under starlit skies, shared dreams over quiet cups of coffee, and realizing that home isn’t a place—it’s a person.',
      location: 'Misty Hilltop Viewpoint',
      imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
      quote: '"Every ordinary day became extraordinary with you."',
    },
    {
      id: 'milestone-3',
      year: '2025',
      date: 'Under the Golden Glow',
      title: 'The Proposal',
      subtitle: 'A Question Answered with Tears of Joy',
      description: 'On a candlelit terrace overlooking the shimmering waters, Kishore bent on one knee, holding a promise of a lifetime. The answer was a heartfelt "Yes!"',
      location: 'Lakeside Pavilion',
      imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80',
      quote: '"I will choose you in a hundred lifetimes, in every universe."',
    },
    {
      id: 'milestone-4',
      year: '2027',
      date: 'February 14, 2027',
      title: 'Our Forever Begins',
      subtitle: 'The Sacred Vows',
      description: 'Stepping hand in hand across the threshold of destiny, enveloped in the blessings of our dearest families and lifelong friends.',
      location: 'The Grand Palace Heritage',
      imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      quote: '"Two souls, one sacred vow for eternity."',
    },
  ],

  // Pre-Wedding Photo Gallery
  gallery: [
    {
      id: 'photo-1',
      title: 'Eternal Golden Hour',
      category: 'portraits',
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      aspectRatio: 'landscape',
      caption: 'Basked in the champagne glow of the setting sun.',
      location: 'Palace Gardens',
    },
    {
      id: 'photo-2',
      title: 'A Whisper of Tomorrow',
      category: 'editorial',
      imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=80',
      aspectRatio: 'portrait',
      caption: 'Intimate moments captured in classical royal elegance.',
      location: 'Marble Corridor',
    },
    {
      id: 'photo-3',
      title: 'Laughter Under the Canopy',
      category: 'candid',
      imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
      aspectRatio: 'landscape',
      caption: 'Pure, unscripted happiness shared between soulmates.',
      location: 'Botanical Estate',
    },
    {
      id: 'photo-4',
      title: 'The Promise Ring',
      category: 'moments',
      imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80',
      aspectRatio: 'square',
      caption: 'Twin golden bands sculpted for eternity.',
      location: 'The Veranda',
    },
    {
      id: 'photo-5',
      title: 'Regal Symphony',
      category: 'editorial',
      imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
      aspectRatio: 'landscape',
      caption: 'Dressed in midnight burgundy and warm gold accents.',
      location: 'Heritage Courtyard',
    },
    {
      id: 'photo-6',
      title: 'Hand in Hand',
      category: 'portraits',
      imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80',
      aspectRatio: 'portrait',
      caption: 'Walking towards forever with steadfast trust.',
      location: 'Lakeside Promenade',
    },
  ],

  // Wedding Events & Celebrations
  events: [
    {
      id: 'event-sangeet',
      name: 'Sangeet & Musical Evening',
      tagline: 'An evening of rhythm, celebration, and dancing',
      date: 'Friday, February 12, 2027',
      time: '06:30 PM Onwards',
      venueName: 'The Royal Crystal Ballroom',
      address: '[Configurable Venue Address, Heritage Road]',
      city: '[City Name, State]',
      dressCode: 'Indo-Western Glitz & Cocktail Elegance',
      dressCodeDescription: 'Deep Burgundy, Royal Wine, Champagne Gold shimmer',
      mapUrl: 'https://maps.google.com/?q=Luxury+Wedding+Ballroom',
      iconType: 'music',
    },
    {
      id: 'event-haldi',
      name: 'Haldi & Floral Phoolon Ki Holi',
      tagline: 'Golden turmeric blessings and fresh flower shower',
      date: 'Saturday, February 13, 2027',
      time: '10:00 AM – 01:30 PM',
      venueName: 'The Sunlit Courtyard & Lotus Pond',
      address: '[Configurable Garden Pavilion Address]',
      city: '[City Name, State]',
      dressCode: 'Shades of Sunshine Yellow & Floral Prints',
      dressCodeDescription: 'Breezy linens, bright ochre and pastel silks',
      mapUrl: 'https://maps.google.com/?q=Garden+Pavilion+Estate',
      iconType: 'sparkler',
    },
    {
      id: 'event-wedding',
      name: 'The Sacred Muhurtham & Vows',
      tagline: 'The divine wedding ritual uniting two destinies',
      date: 'Sunday, February 14, 2027',
      time: '10:30 AM – 12:45 PM',
      venueName: 'The Sanctum Mandapam, Heritage Palace',
      address: '[Configurable Grand Palace Address]',
      city: '[City Name, State]',
      dressCode: 'Traditional Royal Attire',
      dressCodeDescription: 'Rich Kanjivaram silks, Sherwanis, and Gold accents',
      mapUrl: 'https://maps.google.com/?q=Heritage+Palace+Grounds',
      iconType: 'sacred',
    },
    {
      id: 'event-reception',
      name: 'The Grand Royal Reception',
      tagline: 'A gala banquet under twinkling starlight',
      date: 'Sunday, February 14, 2027',
      time: '07:00 PM Onwards',
      venueName: 'Grand Imperial Lawns & Pavilions',
      address: '[Configurable Imperial Lawns Address]',
      city: '[City Name, State]',
      dressCode: 'Formal Black Tie & Royal Ethnic',
      dressCodeDescription: 'Velvet tuxedos, heavy couture lehengas and regal jewels',
      mapUrl: 'https://maps.google.com/?q=Grand+Imperial+Lawns',
      iconType: 'celebration',
    },
  ],

  // Family Blessings
  familyBlessings: [
    {
      id: 'blessing-groom',
      side: 'groom',
      title: 'From Kishore’s Family',
      members: '[Groom’s Parents & Extended Family]',
      relationship: 'Parents of the Groom',
      blessing: 'Watching Kishore grow into a gentleman of honor and kindness has been our life’s greatest joy. As he embarks on this holy union, our hearts overflow with boundless love, prayers, and blessings for everlasting harmony.',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'blessing-bride',
      side: 'bride',
      title: 'From the Bride’s Family',
      members: '[Bride’s Parents & Extended Family]',
      relationship: 'Parents of the Bride',
      blessing: 'Our beloved daughter is the light of our home. Welcoming Kishore into our family brings immense warmth and peace. May your life together be a masterpiece of mutual respect, endless laughter, and boundless affection.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
  ],
};
