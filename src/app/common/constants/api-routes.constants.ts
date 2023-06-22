// eslint-disable-next-line import/prefer-default-export
export const API_ROUTES = {
    BASE: '/',
    HISTORICAL_CONTEXT: {
        GET_ALL: 'historicalContext/getAll',
    },
    FACTS: {
        GET_ALL: 'fact/getAll',
        GET: 'fact/getById',
        GET_BY_STREETCODE_ID: 'fact/getByStreetcodeId',
        CREATE: 'fact/create',
        UPDATE: 'fact/update',
        DELETE: 'fact/delete',
    },
    NEWS: {
        GET_ALL: 'news/getAll',
        GET: 'news/getById',
        GET_BY_URL: 'news/getByUrl',
        GET_NEWS_AND_LINKS_BY_URL: 'news/getNewsAndLinksByUrl',
        GET_ALL_SORTED: 'news/sortedNewsByDateTime',
        CREATE: 'news/create',
        DELETE: 'news/delete',
        UPDATE: 'news/update',
    },
    PARTNERS: {
        GET_ALL: 'partners/getAll',
        GET_ALL_SHORT: 'partners/getAllShort',
        GET_SPONSORS: 'partners/getSponsors',
        GET: 'partners/getById',
        GET_BY_STREETCODE_ID: 'partners/getByStreetcodeId',
        GET_TO_UPDATE_BY_STREETCODE_ID: 'partners/getToUpdateByStreetcodeId',
        CREATE: 'partners/create',
        UPDATE: 'partners/update',
        DELETE: 'partners/delete',
    },
    TAGS: {
        GET_ALL: 'tag/getAll',
        GET: 'tag/getById',
        GET_BY_TITLE: 'tag/getByTitle',
        GET_BY_STREETCODE_ID: 'tag/getByStreetcodeId',
        CREATE: 'tag/create',
        UPDATE: 'tag/update',
        DELETE: 'tag/delete',
    },
    TERMS: {
        GET_ALL: 'term/getAll',
        GET: 'term/getById',
        CREATE: 'term/create',
        UPDATE: 'term/update',
        DELETE: 'term/delete',
    },
    RELATED_TERMS: {
        GET_ALL_BY_TERM_ID: 'relatedTerm/getByTermId',
        CREATE: 'relatedTerm/create',
        DELETE: 'relatedTerm/delete',
        UPDATE: 'relatedTerm/update',
        GET_ALL: 'relatedTerm/getAll',
    },
    TEXTS: {
        GET_ALL: 'text/getAll',
        CREATE: 'text/create',
        GET_BY_STREETCODE_ID: 'text/getByStreetcodeId',
        GET: 'text/getById',
        UPDATE: 'text/update',
        DELETE: 'text/delete',
    },
    TIMELINE: {
        GET_ALL: 'timelineItem/getAll',
        GET: 'timelineItem/getById',
        GET_BY_STREETCODE_ID: 'timelineItem/getByStreetcodeId',
        CREATE: 'timelineItem/create',
        UPDATE: 'timelineItem/update',
        DELETE: 'timelineItem/delete',
    },
    TEAM: {
        GET_ALL: 'team/getAll',
        GET_ALL_MAIN: 'team/getAllMain',
        GET: 'team/getById',
        CREATE: 'team/create',
        UPDATE: 'team/update',
        DELETE: 'team/delete',
    },
    POSITIONS: {
        GET_ALL: 'position/getAll',
        GET: 'position/getById',
        CREATE: 'position/create',
        UPDATE: 'position/update',
        DELETE: 'position/delete',
    },
    TOPONYMS: {
        GET_ALL: 'toponym/getAll',
        CREATE: 'toponym/create',
        GET: 'toponym/getById',
        GET_BY_STREETCODE_ID: 'toponym/getByStreetcodeId',
        GET_BY_NAME: 'toponym/getByName',
        UPDATE: 'toponym/update',
        DELETE: 'toponym/delete',
    },
    SOURCES: {
        GET_ALL_CATEGORIES_NAMES: 'sources/getAllNames',
        GET_ALL_CATEGORIES: 'sources/getAllCategories',
        GET: 'sources/getCategoryById',
        GET_CATEGORIES_BY_STREETCODE_ID: 'sources/getCategoriesByStreetcodeId',
        GET_CONTENT_BY_STREETCODE_ID: 'sources/getCategoryContentByStreetcodeId',
        CREATE: 'sources/createCategory',
        UPDATE: 'sources/updateCategory',
        DELETE: 'sources/deleteCategory',
    },
    TRANSACTION_LINKS: {
        GET_ALL: 'transactLinks/getAll',
        GET_BY_ID: 'transactLinks/getById',
        GET_BY_STREETCODE_ID: 'transactLinks/getByStreetcodeId',
    },
    AUDIOS: {
        GET_ALL: 'audio/getAll',
        GET: 'audio/getById',
        GET_BY_STREETCODE_ID: 'audio/getByStreetcodeId',
        CREATE: 'audio/create',
        UPDATE: 'audio/update',
        DELETE: 'audio/delete',
    },
    VIDEOS: {
        GET_ALL: 'video/getAll',
        GET_BY_STREETCODE_ID: 'video/getByStreetcodeId',
        GET: 'video/getById',
        CREATE: 'video/create',
        UPDATE: 'video/update',
        DELETE: 'video/delete',
    },
    IMAGES: {
        GET_ALL: 'image/getAll',
        GET: 'image/getById',
        GET_BY_STREETCODE_ID: 'image/getByStreetcodeId',
        CREATE: 'image/create',
        UPDATE: 'image/update',
        DELETE: 'image/delete',
    },
    ARTS: {
        GET_ALL: 'arts/getAll',
        GET: 'arts/getById',
        CREATE: 'arts/create',
        UPDATE: 'arts/update',
        DELETE: 'arts/delete',
    },
    STREETCODE_ARTS: {
        GET_ALL: 'streetcodeArt/getAll',
        GET_BY_STREETCODE_ID: 'streetcodeArt/getByStreetcodeId',
    },
    RELATED_FIGURES: {
        GET_ALL: 'relatedFigure/getAll',
        GET: 'relatedFigure/getById',
        GET_BY_STREETCODE_ID: 'relatedFigure/getByStreetcodeId',
        GET_BY_TAG_ID: 'relatedFigure/getByTagId',
        CREATE: 'relatedFigure/create',
        UPDATE: 'relatedFigure/update',
        DELETE: 'relatedFigure/delete',
    },
    STREETCODES: {
        GET_ALL: 'streetcode/getAll',
        GET_BY_FILTER: 'streetcode/getByFilter',
        GET_ALL_MAINPAGE: 'streetcode/getAllMainPage',
        GET_ALL_SHORT: 'streetcode/getAllShort',
        GET_SHORT_BY_ID: 'streetcode/getShortById',
        GET_ALL_CATALOG: 'streetcode/getAllCatalog',
        GET_COUNT: 'streetcode/getCount',
        GET_EVENTS: 'streetcode/getEvents',
        GET_PERSONS: 'streetcode/getPersons',
        GET: 'streetcode/getById',
        GET_BY_NAME: 'streetcode/getByName',
        GET_BY_TAG_ID: 'streetcode/getByTagId',
        GET_BY_INDEX: 'streetcode/getByIndex',
        GET_BY_URL: 'streetcode/getByTransliterationUrl',
        GET_URL_BY_QR_ID: 'streetcode/getByQrId',
        CREATE: 'streetcode/create',
        UPDATE: 'streetcode/update',
        UPDATE_STATE: 'streetcode/patchStage',
        DELETE: 'streetcode/delete',
        EXIST_WITH_INDEX: 'streetcode/existWithIndex',
        EXIST_WITH_URL: 'streetcode/existWithUrl',
    },
    SUBTITLES: {
        GET_ALL: 'subtitle/getAll',
        GET: 'subtitle/getById',
        GET_BY_STREETCODE_ID: 'subtitle/getByStreetcodeId',
        CREATE: 'subtitle/create',
        UPDATE: 'subtitle/update',
        DELETE: 'subtitle/delete',
    },
    STREETCODE_COORDINATES: {
        GET_ALL: 'coordinate/getAll',
        GET: 'coordinate/getById',
        GET_BY_STREETCODE_ID: 'coordinate/getByStreetcodeId',
        CREATE: 'coordinate/create',
        UPDATE: 'coordinate/update',
        DELETE: 'coordinate/delete',
    },
    USERS: {
        LOGIN: 'user/login',
        REFRESH_TOKEN: 'user/refreshToken',
    },
    EMAIL: {
        SEND: 'email/send',
    },
    DONATION: {
        CREATE: 'payment/createInvoice',
    },
    INSTAGRAM: {
        GET_ALL: 'instagram/getAll',
    },
    STATISTIC_RECORD: {
        GET_ALL: 'statisticRecord/getAll',
        GET_BY_QRID: 'statisticRecord/getByQrId',
        GET_ALL_BY_STREETCODE_ID: 'statisticRecord/getAllByStreetcodeId',
        EXIST_BY_QRID: 'statisticRecord/existByQrId',
        CREATE: 'statisticRecord/create',
        UPDATE: 'statisticRecord/update',
        DELETE: 'statisticRecord/delete',
    },
};
