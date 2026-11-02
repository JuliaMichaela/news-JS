export type ApiStatus = 'ok' | 'error';

export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export type NewsSourceCategory =
    | 'business'
    | 'entertainment'
    | 'general'
    | 'health'
    | 'science'
    | 'sports'
    | 'technology';

export interface ArticleSource {
    id: string | null;
    name: string;
}

export interface NewsSource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: NewsSourceCategory;
    language: string;
    country: string;
}

export interface Article {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface SourcesResponse {
    status: 'ok';
    sources: NewsSource[];
}

export interface ArticlesResponse {
    status: 'ok';
    totalResults: number;
    articles: Article[];
}

export interface ApiErrorResponse {
    status: 'error';
    code: string;
    message: string;
}

export interface EndpointResponseMap {
    [Endpoint.Sources]: SourcesResponse;
    [Endpoint.Everything]: ArticlesResponse;
}

export type ApiResponse<T> = T | ApiErrorResponse;

export type QueryParams = Record<string, string | number | boolean | undefined>;

export interface RequestConfig {
    endpoint: Endpoint;
    options?: QueryParams;
}

export type LoaderCallback<T> = (data: T) => void;
