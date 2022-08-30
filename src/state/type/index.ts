
export interface Article {
    article?: {
        author?: {
            username?: string,
            bio?: string,
            image?: string,
            following?: boolean
        },
        body?: string,
        createdAt?: string,
        description?: string,
        favorited?: boolean,
        favoritesCount?: number,
        slug?: string,
        tagList?: string[],
        title?: string,
        updatedAt?: string
    }
}

export interface Articles {
    articles?:
    [
        {
            author?: {
                username?: string,
                bio?: string,
                image?: string,
                following?: boolean
            },
            body?: string,
            createdAt?: string,
            description?: string,
            favorited?: boolean,
            favoritesCount?: number,
            slug?: string,
            tagList?: string[],
            title?: string,
            updatedAt?: string
        }
    ];
    articlesCount: number;
}
export interface User {
    user?: {
        username?: string;
        email?: string;
        bio?: string;
        image?: string;
        token?: string;
        password?: string;
    }
}