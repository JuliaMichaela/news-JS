import { Endpoint, EndpointResponseMap, LoaderCallback, QueryParams, RequestConfig } from '../../types';

class Loader {
    private readonly baseLink: string;

    private readonly options: QueryParams;

    constructor(baseLink: string, options: QueryParams) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<E extends Endpoint>(
        { endpoint, options = {} }: RequestConfig<E>,
        callback: LoaderCallback<EndpointResponseMap[E]> = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(endpoint: Endpoint, options: QueryParams): string {
        const params = new URLSearchParams();

        Object.entries({ ...this.options, ...options }).forEach(([key, value]) => {
            if (value !== undefined) params.append(key, String(value));
        });

        return `${this.baseLink}${endpoint}?${params.toString()}`;
    }

    private load<E extends Endpoint>(
        method: 'GET',
        endpoint: E,
        callback: LoaderCallback<EndpointResponseMap[E]>,
        options: QueryParams = {}
    ): void {
        fetch(this.makeUrl(endpoint, options), { method })
            .then((res) => this.errorHandler(res))
            .then((res) => res.json() as Promise<EndpointResponseMap[E]>)
            .then((data) => callback(data))
            .catch((err: unknown) => console.error(err));
    }
}

export default Loader;
