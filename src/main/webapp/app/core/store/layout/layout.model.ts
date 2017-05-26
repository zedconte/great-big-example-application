// TODO: Think about renaming this. It's more of a user controls slice than a layout per se
// Also, these data should be defined in the features directory since they are UI specific

import { slices } from '../util';

export interface NavLayout {
    showSidenav: boolean;
}

export const initialNavLayout = {
    showSidenav: false
};

export interface BooksPageLayout {
    query: string;
};

export const initialBooksPageLayout = {
    query: ''
};

export interface BerniePageLayout {
    editable: boolean;
    expanded: boolean;
    scrollY: number;
    bernieSearchTerm: string;
    // isTouched: Function;
};

export const initialBerniePageLayout: BerniePageLayout = {
    editable: false,
    expanded: false,
    scrollY: 0,
    bernieSearchTerm: ''
    // isTouched: function (claims) {
    //   let _touched = false;
    //   claims.forEach(claim => {
    //     claim.rebuttals.forEach(rebuttal => {
    //       if (rebuttal && rebuttal.isTouched()) {
    //         _touched = true;
    //       }
    //     });
    //   });
    //   return _touched;
    // }
};

export interface HeroesDashboardLayout {
    heroSearchTerm: string;
}

export const initialHeroesDashboardPageLayout = {
    heroSearchTerm: ''
};

export interface BlogPageLayout {
    type: string,

    filters: {
        tag?: string,
        author?: string,
        favorited?: string,
        limit?: number,
        offset?: number
    }
}

export const initialBlogPageLayout = {
    type: 'all',

    filters: {}
};

export interface Layout {
    nav: NavLayout;
    booksPage: BooksPageLayout;
    berniePage: BerniePageLayout;
    heroesDashboardPage: HeroesDashboardLayout;
    msg: string;
}

export function initialLayout() {
    return {
        nav: initialNavLayout,
        booksPage: initialBooksPageLayout,
        blogPage: initialBlogPageLayout,
        berniePage: initialBerniePageLayout,
        heroesDashboardPage: initialHeroesDashboardPageLayout,
        msg: ''
    };
}
