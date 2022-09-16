export interface Data {
    data: GamesInterface[];
}

export interface GamesInterface {
    id: string;
    title: string;
    bannerUrl: string;
    _count: Count;
}

export interface Count {
    ads: number;
}
