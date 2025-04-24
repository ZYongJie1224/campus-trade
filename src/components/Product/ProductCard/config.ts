interface ProductDetailVO {
    // 商品基础信息 (Product basic information)
    productName: string;
    productTitle: string;
    productPrice: number; // or string if you prefer to handle BigDecimal as string
    productMainImg: string;
    productDescription: string;
    wants:number;
    
    // 分类信息 (Category information)
    categoryName: string;
    
    // 创建者信息 (Creator information)
    nickname: string;
    avatarUrl: string;
    isVerified: number;
}