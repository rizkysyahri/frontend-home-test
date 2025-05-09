export type TProfile = {
  id?: string;
  username: string;
  role: string;
};

export type ICategory = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type IUser = {
  id: string;
  username: string;
  role: string;
};

export type IArticlesPagination = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  category: ICategory;
  user: IUser;
};

export type ICategories = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}
