export interface IArtist {
  id: number;
  name: string;
  image: string;
  artistType?: string;
}

export interface IArtistDetail {
  name: string;
  image: string;
  artistType: string;
  group: {
    id: number;
    name: string;
    image: string;
  } | null;
  groupMembers: {
    id: number;
    name: string;
    image: string;
  }[];
  albumResponses: IAlbum[];
  hashtag: string[];
}

export interface IAlbum {
  id: number;
  name: string;
  image: string;
} // ImageGridType

export interface IAlbumDetail {
  id: number;
  name: string;
  image: string;
  vote: number;
  releaseDate: string;
  musicVideo: string;
  artistResponse: IArtist;
}
