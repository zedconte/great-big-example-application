import { Blog } from '../blog';
import { Tag } from '../tag';
export class Article {
    constructor(
        public id?: number,
        public title?: string,
        public content?: any,
        public contentType?: string,
        public date?: any,
        public blog?: Blog,
        public tag?: Tag,
    ) {
    }
}
