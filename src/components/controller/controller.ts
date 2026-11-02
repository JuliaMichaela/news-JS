import AppLoader from './appLoader';
import { ArticlesResponse, Endpoint, LoaderCallback, SourcesResponse } from '../../types';

class AppController extends AppLoader {
    public getSources(callback: LoaderCallback<SourcesResponse>): void {
        super.getResp(
            {
                endpoint: Endpoint.Sources,
            },
            callback
        );
    }

    public getNews(e: Event, callback: LoaderCallback<ArticlesResponse>): void {
        const newsContainer = e.currentTarget;
        let target = e.target;

        if (!(newsContainer instanceof HTMLElement) || !(target instanceof Element)) return;

        while (target !== newsContainer) {
            if (!(target instanceof Element)) return;

            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId !== null && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: Endpoint.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode;
        }
    }
}

export default AppController;
