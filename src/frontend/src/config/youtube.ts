// Centralized YouTube channel configuration for Keep Going Classes
export const YOUTUBE_CONFIG = {
  // Replace with your actual YouTube channel URL
  channelUrl: 'https://www.youtube.com/@keepgoingclasses',
  // Channel ID or handle for feed fetching
  channelHandle: '@keepgoingclasses',
  // RSS feed URL (YouTube provides public RSS feeds)
  getFeedUrl: () => {
    // Note: Replace with actual channel ID if available
    // Format: https://www.youtube.com/feeds/videos.xml?channel_id=YOUR_CHANNEL_ID
    // For now using handle-based approach
    return `https://www.youtube.com/feeds/videos.xml?channel_id=UCYourChannelIDHere`;
  },
};
