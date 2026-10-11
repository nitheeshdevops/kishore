import type { WeddingConfig } from '../types';

/**
 * WEDDING CONFIGURATION
 * -------------------------------------------------------------
 * Centralized configuration for the pre-wedding experience.
 * Groom: KISHORE G
 * Bride: SHRIKA ARUL A
 * Wedding Date: JUNE 10, 2032
 */
export const defaultWeddingConfig: WeddingConfig = {
  groom: {
    firstName: 'KISHORE',
    fullName: 'Kishore G',
    title: 'The Groom',
    bio: 'An adventurous soul with a steadfast heart, ready to embark on life’s most radiant journey beside Shrika.',
    parents: 'Son of [Groom’s Parents]',
  },
  bride: {
    firstName: 'SHRIKA',
    fullName: 'Shrika Arul A',
    title: 'The Bride',
    bio: 'Graceful, radiant, and bringing warmth to every shared moment, ready to walk hand in hand forever with Kishore.',
    parents: 'Daughter of [Bride’s Parents]',
  },
  weddingDate: '2032-06-10T10:30:00+05:30',
  weddingDateFormatted: 'Thursday, June 10, 2032',
  timezone: 'Asia/Kolkata',
  hashtag: '#KishoreWedsShrika',
  tagline: 'A BEAUTIFUL BEGINNING',
  subtagline: 'Two hearts, one promise. A lifetime of love. Forever & Always.',
  invitationNote: 'With the blessings of our parents and loved ones, we invite you to join us as we celebrate the sacred union of Kishore & Shrika.',
  
  // Audio configuration
  audioTrack: {
    title: 'A Thousand Whispers of Eternity',
    artist: 'Cinematic Orchestral Serenade',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3',
  },

  // Video teaser configuration
  videoTeaser: {
    title: 'KISHORE & SHRIKA — The Pre-Wedding Film',
    subtitle: 'A glimpse into our moments of laughter, whispered promises, and timeless romance',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    posterUrl: '/images/kishore_shrika_royal.png',
    duration: '3:45 MINS',
  },

  shareMessage: 'You are cordially invited to celebrate the union of Kishore G and Shrika Arul A! Step into our 3D love story.',
  websiteUrl: typeof window !== 'undefined' ? window.location.href : 'https://kishore-shrika.love',

  // Story Timeline Milestones with Real Photos
  milestones: [
    {
      id: 'milestone-1',
      year: '2022',
      date: 'Autumn Whispers',
      title: 'The First Spark',
      subtitle: 'Where Two Souls Met',
      description: 'A serendipitous evening that turned an ordinary conversation into the start of an extraordinary destiny. Kishore and Shrika realized they shared a world of their own.',
      location: 'Cozy Coffee Nook',
      imageUrl: '/images/kishore_shrika_candid.png',
      quote: '"In a world full of strangers, you felt instantly like home."',
    },
    {
      id: 'milestone-2',
      year: '2024',
      date: 'Floral Canopy',
      title: 'Cherished Memories',
      subtitle: 'Shared Smiles & Gentle Promises',
      description: 'Under the arched white verandas and blooming plumeria flowers, every shared glance spoke volumes. Growing together through laughter, trust, and gentle care.',
      location: 'Botanical Heritage Estate',
      imageUrl: '/images/kishore_shrika_arch.png',
      quote: '"Every ordinary day became pure poetry beside you."',
    },
    {
      id: 'milestone-3',
      year: '2030',
      date: 'Golden Sunset',
      title: 'The Golden Promise',
      subtitle: 'Save The Date — June 10, 2032',
      description: 'Against the cinematic desert dunes bathed in champagne sunlight, Kishore and Shrika sealed their eternal promise. A vow etched in the sands of time.',
      location: 'The Sunlit Dunes',
      imageUrl: '/images/kishore_shrika_desert.png',
      quote: '"Two hearts, one promise. A lifetime of love. Forever & Always."',
    },
    {
      id: 'milestone-4',
      year: '2032',
      date: 'June 10, 2032',
      title: 'The Royal Mandap',
      subtitle: 'Our Forever Begins',
      description: 'Adorned in royal gold and scarlet silk, Kishore & Shrika step across the sacred threshold under the floral canopy, united in holy matrimony.',
      location: 'The Royal Mandapam, Grand Heritage',
      imageUrl: '/images/kishore_shrika_royal.png',
      quote: '"Bound by sacred vows, blessed by eternal love."',
    },
  ],

  // Pre-Wedding Photo Gallery with Real Couple Photos
  gallery: [
    {
      id: 'photo-1',
      title: 'The Royal Mandap',
      category: 'portraits',
      imageUrl: '/images/kishore_shrika_royal.png',
      aspectRatio: 'portrait',
      caption: 'Kishore & Shrika in royal bridal elegance under golden floral garlands.',
      location: 'The Grand Mandapam',
    },
    {
      id: 'photo-2',
      title: 'Desert Sunset Promise',
      category: 'editorial',
      imageUrl: '/images/kishore_shrika_desert.png',
      aspectRatio: 'square',
      caption: 'Two hearts, one promise. Save the date — June 10, 2032.',
      location: 'Sunset Dunes',
    },
    {
      id: 'photo-3',
      title: 'Under the Archway',
      category: 'candid',
      imageUrl: '/images/kishore_shrika_arch.png',
      aspectRatio: 'portrait',
      caption: 'Quiet affectionate moments framed beneath the white garden arch.',
      location: 'The Heritage Courtyard',
    },
    {
      id: 'photo-4',
      title: 'Warm Memories & Laughter',
      category: 'moments',
      imageUrl: '/images/kishore_shrika_candid.png',
      aspectRatio: 'square',
      caption: 'Unscripted smiles, warm embraces, and pure joy.',
      location: 'The Memory Wall',
    },
    {
      id: 'photo-5',
      title: 'The Golden Vow',
      category: 'editorial',
      imageUrl: '/images/kishore_shrika_desert.png',
      aspectRatio: 'landscape',
      caption: 'Forever & Always — A bond that time cannot fade.',
      location: 'Golden Horizon',
    },
    {
      id: 'photo-6',
      title: 'Royal Symphony',
      category: 'portraits',
      imageUrl: '/images/kishore_shrika_royal.png',
      aspectRatio: 'landscape',
      caption: 'Stepping hand in hand into a lifetime of shared dreams.',
      location: 'Sanctum Grounds',
    },
  ],

  // Wedding Events & Celebrations
  events: [
    {
      id: 'event-sangeet',
      name: 'Sangeet & Musical Evening',
      tagline: 'An evening of rhythm, celebration, and dancing for Kishore & Shrika',
      date: 'Tuesday, June 8, 2032',
      time: '06:30 PM Onwards',
      venueName: 'The Royal Crystal Ballroom',
      address: '[Heritage Pavilion, Grand Avenue]',
      city: 'Chennai, Tamil Nadu',
      dressCode: 'Indo-Western Glitz & Cocktail Elegance',
      dressCodeDescription: 'Deep Burgundy, Royal Wine, Champagne Gold shimmer',
      mapUrl: 'https://maps.google.com/?q=Luxury+Wedding+Ballroom',
      iconType: 'music',
    },
    {
      id: 'event-haldi',
      name: 'Haldi & Floral Phoolon Ki Holi',
      tagline: 'Golden turmeric blessings and fresh flower shower',
      date: 'Wednesday, June 9, 2032',
      time: '10:00 AM – 01:30 PM',
      venueName: 'The Sunlit Courtyard & Lotus Pond',
      address: '[Botanical Garden Pavilion Address]',
      city: 'Chennai, Tamil Nadu',
      dressCode: 'Shades of Sunshine Yellow & Floral Prints',
      dressCodeDescription: 'Breezy linens, bright ochre and pastel silks',
      mapUrl: 'https://maps.google.com/?q=Garden+Pavilion+Estate',
      iconType: 'sparkler',
    },
    {
      id: 'event-wedding',
      name: 'The Sacred Muhurtham & Vows',
      tagline: 'The divine wedding ritual uniting Kishore & Shrika forever',
      date: 'Thursday, June 10, 2032',
      time: '10:30 AM – 12:45 PM',
      venueName: 'The Sanctum Mandapam, Heritage Palace',
      address: '[Grand Heritage Palace Address]',
      city: 'Chennai, Tamil Nadu',
      dressCode: 'Traditional Royal Attire',
      dressCodeDescription: 'Rich Kanjivaram silks, Royal Sherwanis, and Gold jewelry',
      mapUrl: 'https://maps.google.com/?q=Heritage+Palace+Grounds',
      iconType: 'sacred',
    },
    {
      id: 'event-reception',
      name: 'The Grand Royal Reception',
      tagline: 'A gala banquet under twinkling starlight',
      date: 'Thursday, June 10, 2032',
      time: '07:00 PM Onwards',
      venueName: 'Grand Imperial Lawns & Pavilions',
      address: '[Imperial Palace Lawns]',
      city: 'Chennai, Tamil Nadu',
      dressCode: 'Formal Black Tie & Royal Ethnic',
      dressCodeDescription: 'Velvet tuxedos, couture lehengas and regal jewels',
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
      members: 'The Parents & Family of Kishore G',
      relationship: 'Parents of the Groom',
      blessing: 'Watching Kishore find his true partner in Shrika fills our hearts with boundless happiness. May their life together be an eternal journey of laughter, devotion, honor, and prosperity.',
      avatarUrl: '/images/kishore_shrika_candid.png',
    },
    {
      id: 'blessing-bride',
      side: 'bride',
      title: 'From Shrika’s Family',
      members: 'The Parents & Family of Shrika Arul A',
      relationship: 'Parents of the Bride',
      blessing: 'Our dearest Shrika is the blessing of our home. Welcoming Kishore into our family brings immense warmth and peace. May God shower endless grace and happiness upon Kishore & Shrika.',
      avatarUrl: '/images/kishore_shrika_arch.png',
    },
  ],
};
