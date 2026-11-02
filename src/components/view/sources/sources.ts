import './sources.css';
import { NewsSource } from '../../../types';
import { getElement } from '../../../utils/dom';

class Sources {
    public draw(data: readonly NewsSource[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = getElement<HTMLTemplateElement>(document, '#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = document.importNode(sourceItemTemp.content, true);

            getElement(sourceClone, '.source__item-name').textContent = item.name;
            getElement(sourceClone, '.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        getElement(document, '.sources').append(fragment);
    }
}

export default Sources;
