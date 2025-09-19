import { db, storage } from '../firebase';

export interface Video {
  id: string;
  title: string;
  description: string;
  uploader: string;
  uploaderId: string;
  uploadDate: string;
  videoUrl: string;
  thumbnailUrl: string;
  tags: string[];
  category: 'demo' | 'review' | 'unboxing' | 'tutorial' | 'testimonial';
  linkedProductId?: string;
  linkedProductName?: string;
  linkedProductPrice?: string;
  viewCount: number;
  likeCount: number;
  duration: string;
  status: 'pending' | 'approved' | 'rejected';
  isAiGenerated?: boolean;
  createdAt: any; // Firebase Timestamp
  updatedAt: any; // Firebase Timestamp
}

export interface VideoFilters {
  category?: string;
  status?: 'pending' | 'approved' | 'rejected';
  uploaderId?: string;
  keyword?: string;
  tags?: string[];
  minViews?: number;
  sortBy?: 'recent' | 'views' | 'likes' | 'trending';
  limit?: number;
  lastDoc?: any; // Firebase DocumentSnapshot
}

export interface VideoSubmission {
  name: string;
  email: string;
  title: string;
  description: string;
  category: 'demo' | 'review' | 'unboxing' | 'tutorial' | 'testimonial';
  linkedProductId?: string;
  videoFile?: File;
  videoUrl?: string;
  tags: string[];
}

const VIDEOS_COLLECTION = 'videos';

/**
 * Fetch videos with optional filtering and pagination
 */
export async function fetchVideos(filters: VideoFilters = {}): Promise<Video[]> {
  try {
    // @ts-ignore - Firebase v11 module resolution issue
    const { collection, query, where, orderBy, limit, startAfter, getDocs } = await import('firebase/firestore');
    
    const dbInstance = await db;
    if (!dbInstance) throw new Error('Firestore not initialized');
    
    let q = query(collection(dbInstance, VIDEOS_COLLECTION));

    // Apply filters
    if (filters.category && filters.category !== 'all') {
      if (filters.category === 'trending') {
        // For trending, we'll sort by a combination of views and likes
        q = query(q, where('viewCount', '>=', 10000));
      } else {
        q = query(q, where('category', '==', filters.category));
      }
    }

    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }

    if (filters.uploaderId) {
      q = query(q, where('uploaderId', '==', filters.uploaderId));
    }

    if (filters.minViews) {
      q = query(q, where('viewCount', '>=', filters.minViews));
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'views':
        q = query(q, orderBy('viewCount', 'desc'));
        break;
      case 'likes':
        q = query(q, orderBy('likeCount', 'desc'));
        break;
      case 'trending':
        // For trending, we'll use a combination of recent activity and engagement
        q = query(q, orderBy('viewCount', 'desc'), orderBy('createdAt', 'desc'));
        break;
      case 'recent':
      default:
        q = query(q, orderBy('createdAt', 'desc'));
        break;
    }

    // Apply pagination
    if (filters.lastDoc) {
      q = query(q, startAfter(filters.lastDoc));
    }

    if (filters.limit) {
      q = query(q, limit(filters.limit));
    }

    const querySnapshot = await getDocs(q);
    const videos: Video[] = [];

    querySnapshot.forEach((doc: any) => {
      const data = doc.data();
      videos.push({
        id: doc.id,
        ...data,
        uploadDate: data.createdAt?.toDate?.()?.toISOString?.() || data.uploadDate,
      } as Video);
    });

    // Client-side filtering for keyword search (for better performance, consider using Algolia or similar)
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      return videos.filter(video => 
        video.title.toLowerCase().includes(keyword) ||
        video.description.toLowerCase().includes(keyword) ||
        video.tags.some(tag => tag.toLowerCase().includes(keyword)) ||
        video.uploader.toLowerCase().includes(keyword)
      );
    }

    return videos;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw new Error('Failed to fetch videos');
  }
}

/**
 * Get a single video by ID
 */
export async function getVideoById(videoId: string): Promise<Video | null> {
  try {
    const videos = await fetchVideos();
    return videos.find(video => video.id === videoId) || null;
  } catch (error) {
    console.error('Error fetching video:', error);
    return null;
  }
}

/**
 * Submit a new video for review
 */
export async function submitVideo(submission: VideoSubmission): Promise<string> {
  try {
    // @ts-ignore - Firebase v11 module resolution issue
    const { collection, addDoc, Timestamp } = await import('firebase/firestore');
    // @ts-ignore - Firebase v11 module resolution issue
    const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
    
    const dbInstance = await db;
    const storageInstance = await storage;
    if (!dbInstance) throw new Error('Firestore not initialized');
    if (!storageInstance) throw new Error('Storage not initialized');
    
    let videoUrl = submission.videoUrl || '';
    let thumbnailUrl = '';

    // Upload video file if provided
    if (submission.videoFile) {
      const videoRef = ref(storageInstance, `videos/${Date.now()}_${submission.videoFile.name}`);
      const uploadResult = await uploadBytes(videoRef, submission.videoFile);
      videoUrl = await getDownloadURL(uploadResult.ref);
      
      // Generate thumbnail (in a real app, you'd use a video processing service)
      thumbnailUrl = videoUrl; // Placeholder
    }

    // Create video document
    const videoData = {
      title: submission.title,
      description: submission.description,
      uploader: submission.name,
      uploaderId: 'anonymous', // In a real app, this would be the authenticated user ID
      videoUrl,
      thumbnailUrl,
      tags: submission.tags,
      category: submission.category,
      linkedProductId: submission.linkedProductId,
      linkedProductName: '', // Would be fetched from products collection
      linkedProductPrice: '', // Would be fetched from products collection
      viewCount: 0,
      likeCount: 0,
      duration: '0:00', // Would be extracted from video file
      status: 'pending' as const,
      isAiGenerated: false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(dbInstance, VIDEOS_COLLECTION), videoData);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting video:', error);
    throw new Error('Failed to submit video');
  }
}

/**
 * Update video status (for admin use)
 */
export async function updateVideoStatus(
  videoId: string,
  status: 'pending' | 'approved' | 'rejected'
): Promise<void> {
  try {
    // @ts-ignore - Firebase v11 module resolution issue
    const { doc, updateDoc, Timestamp } = await import('firebase/firestore');
    
    const dbInstance = await db;
    if (!dbInstance) throw new Error('Firestore not initialized');
    
    const videoRef = doc(dbInstance, VIDEOS_COLLECTION, videoId);
    await updateDoc(videoRef, {
      status,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating video status:', error);
    throw new Error('Failed to update video status');
  }
}

/**
 * Increment video view count
 */
export async function incrementViewCount(videoId: string): Promise<void> {
  try {
    // @ts-ignore - Firebase v11 module resolution issue
    const { doc, updateDoc, Timestamp } = await import('firebase/firestore');
    
    const dbInstance = await db;
    if (!dbInstance) throw new Error('Firestore not initialized');
    
    const videoRef = doc(dbInstance, VIDEOS_COLLECTION, videoId);
    const video = await getVideoById(videoId);
    
    if (video) {
      await updateDoc(videoRef, {
        viewCount: video.viewCount + 1,
        updatedAt: Timestamp.now(),
      });
    }
  } catch (error) {
    console.error('Error incrementing view count:', error);
    // Don't throw error for view count updates
  }
}

/**
 * Toggle video like
 */
export async function toggleVideoLike(videoId: string, isLiked: boolean): Promise<void> {
  try {
    // @ts-ignore - Firebase v11 module resolution issue
    const { doc, updateDoc, Timestamp } = await import('firebase/firestore');
    
    const dbInstance = await db;
    if (!dbInstance) throw new Error('Firestore not initialized');
    
    const videoRef = doc(dbInstance, VIDEOS_COLLECTION, videoId);
    const video = await getVideoById(videoId);
    
    if (video) {
      const newLikeCount = isLiked ? video.likeCount + 1 : Math.max(0, video.likeCount - 1);
      await updateDoc(videoRef, {
        likeCount: newLikeCount,
        updatedAt: Timestamp.now(),
      });
    }
  } catch (error) {
    console.error('Error toggling video like:', error);
    throw new Error('Failed to update like status');
  }
}

/**
 * Delete a video (for admin use)
 */
export async function deleteVideo(videoId: string): Promise<void> {
  try {
    // @ts-ignore - Firebase v11 module resolution issue
    const { doc, deleteDoc } = await import('firebase/firestore');
    // @ts-ignore - Firebase v11 module resolution issue
    const { ref, deleteObject } = await import('firebase/storage');
    
    const dbInstance = await db;
    const storageInstance = await storage;
    if (!dbInstance) throw new Error('Firestore not initialized');
    if (!storageInstance) throw new Error('Storage not initialized');
    
    const video = await getVideoById(videoId);
    
    if (video) {
      // Delete video file from storage if it exists
      if (video.videoUrl && video.videoUrl.includes('firebase')) {
        try {
          const videoRef = ref(storageInstance, video.videoUrl);
          await deleteObject(videoRef);
        } catch (storageError) {
          console.warn('Could not delete video file from storage:', storageError);
        }
      }

      // Delete thumbnail if it exists
      if (video.thumbnailUrl && video.thumbnailUrl.includes('firebase')) {
        try {
          const thumbnailRef = ref(storageInstance, video.thumbnailUrl);
          await deleteObject(thumbnailRef);
        } catch (storageError) {
          console.warn('Could not delete thumbnail from storage:', storageError);
        }
      }
    }

    // Delete document from Firestore
    await deleteDoc(doc(dbInstance, VIDEOS_COLLECTION, videoId));
  } catch (error) {
    console.error('Error deleting video:', error);
    throw new Error('Failed to delete video');
  }
}

/**
 * Get featured videos (high view count, approved status)
 */
export async function getFeaturedVideos(limit: number = 5): Promise<Video[]> {
  return fetchVideos({
    status: 'approved',
    minViews: 5000,
    sortBy: 'trending',
    limit,
  });
}

/**
 * Search videos by keyword
 */
export async function searchVideos(keyword: string, filters: Omit<VideoFilters, 'keyword'> = {}): Promise<Video[]> {
  return fetchVideos({
    ...filters,
    keyword,
  });
}