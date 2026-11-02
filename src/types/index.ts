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

export interface EndpointResponseMap {
    [Endpoint.Sources]: SourcesResponse;
    [Endpoint.Everything]: ArticlesResponse;
}

export type QueryParams = Record<string, string | number | boolean | undefined>;

export interface RequestConfig<E extends Endpoint = Endpoint> {
    endpoint: E;
    options?: QueryParams;
}

export type LoaderCallback<T> = (data: T) => void;
