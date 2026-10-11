export interface StoryMilestone {
  id: string;
  year: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  location?: string;
  quote?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'portraits' | 'candid' | 'moments' | 'editorial';
  imageUrl: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  caption?: string;
  location?: string;
}

export interface WeddingEvent {
  id: string;
  name: string;
  tagline: string;
  date: string; // ISO date or readable string
  time: string;
  venueName: string;
  address: string;
  city: string;
  dressCode: string;
  dressCodeDescription?: string;
  mapUrl: string;
  iconType: 'rings' | 'music' | 'sacred' | 'celebration' | 'sparkler';
}

export interface FamilyBlessing {
  id: string;
  side: 'groom' | 'bride';
  title: string;
  members: string;
  relationship: string;
  blessing: string;
  avatarUrl?: string;
}

export interface GuestWish {
  id: string;
  name: string;
  relation: string;
  message: string;
  createdAt: string;
  likes: number;
  approved?: boolean;
}

export interface WeddingConfig {
  groom: {
    firstName: string;
    fullName: string;
    title: string;
    bio: string;
    parents: string;
  };
  bride: {
    firstName: string;
    fullName: string;
    title: string;
    bio: string;
    parents: string;
  };
  weddingDate: string; // ISO string for countdown: '2027-02-14T10:30:00'
  weddingDateFormatted: string; // e.g. "February 14, 2027"
  timezone: string; // e.g. "Asia/Kolkata"
  hashtag: string;
  tagline: string;
  subtagline: string;
  invitationNote: string;
  audioTrack: {
    title: string;
    artist: string;
    url: string; // audio source URL or synthesized audio
    youtubeId?: string;
  };
  videoTeaser: {
    title: string;
    subtitle: string;
    videoUrl?: string;
    youtubeId?: string;
    posterUrl: string;
    duration: string;
  };
  shareMessage: string;
  websiteUrl: string;
  milestones: StoryMilestone[];
  gallery: GalleryPhoto[];
  events: WeddingEvent[];
  familyBlessings: FamilyBlessing[];
}
