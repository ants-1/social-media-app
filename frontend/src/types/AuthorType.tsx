export interface AuthorType {
  _id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
  bannerUrl?: string;
  description?: string;
  location?: string;
  pendingFriendRequests: [];
  friendRequests?: [];
  friends?: [];
  posts?: [];
  comments?: [];
  dateJoined?: Date;
  }