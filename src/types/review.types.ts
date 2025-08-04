export type TReview = {
  reviewId: string;
  productId: string; 
  buyer: string;
  displayName: string;
  rating: number;
  comment?: string; 
  images?: string[]; 
  isVerifiedBuyer: boolean;
  helpfulVotes: number; 
  unhelpfulVotes: number; 
  createdAt: string; 
  updatedAt?: string; 
}
