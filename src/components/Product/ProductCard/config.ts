export interface ProductDetailVO {
    productId:number,
    productName: string;
    productTitle: string;
    productPrice: number | string;
    productMainImg: string;
    productDescription: string;
    wants: number;
    categoryName: string;
    nickname: string;
    avatarUrl: string;
    isVerified: number;
  }