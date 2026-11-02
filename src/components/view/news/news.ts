import './news.css';
import { Article } from '../../../types';
import { getElement } from '../../../utils/dom';

type NewsItemData = Pick<Article, 'source' | 'author' | 'title' | 'description' | 'url' | 'urlToImage' | 'publishedAt'>;

const NEWS_LIMIT = 10;

class News {
    public draw(data: readonly Article[]): void {
        const news = data.slice(0, NEWS_LIMIT);

        const fragment = document.createDocumentFragment();

        news.forEach((item, idx) => {
            fragment.append(this.createItem(item, idx));
        });

        const container = getElement(document, '.news');
        container.innerHTML = '';
        container.appendChild(fragment);
    }

    private createItem(item: Readonly<NewsItemData>, idx: number): DocumentFragment {
        const newsItemTemp = getElement<HTMLTemplateElement>(document, '#newsItemTemp');
        const newsClone = document.importNode(newsItemTemp.content, true);

        if (idx % 2) getElement(newsClone, '.news__item').classList.add('alt');

        if (item.urlToImage) {
            getElement(newsClone, '.news__meta-photo').style.backgroundImage = `url("${item.urlToImage}")`;
        }
        getElement(newsClone, '.news__meta-author').textContent = item.author || item.source.name;
        getElement(newsClone, '.news__meta-date').textContent = item.publishedAt
            .slice(0, 10)
            .split('-')
            .reverse()
            .join('-');

        getElement(newsClone, '.news__description-title').textContent = item.title;
        getElement(newsClone, '.news__description-source').textContent = item.source.name;
        getElement(newsClone, '.news__description-content').textContent = item.description ?? '';
        getElement(newsClone, '.news__read-more a').setAttribute('href', item.url);

        return newsClone;
    }
}

export default News;
