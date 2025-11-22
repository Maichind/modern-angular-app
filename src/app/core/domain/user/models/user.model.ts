export interface User {
  id: number;
  bio?: string;
  name: string;
  email: string;
  username?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  following?: number[];
  followers?: number[];
}
