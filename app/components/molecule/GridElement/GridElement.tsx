import Section from "@/app/components/atom/Section/Section";
import Artist, { ArtistType } from "@/app/components/atom/Images/Artist";

interface GridCommonProps {
  handleModalOpen: (id: number) => void;
}

interface GridArtistProps extends GridCommonProps, ArtistType {
  type: "artists";
  item: {
    id: number;
    name: string;
    image: string;
  };
}

interface GridAlbumProps extends GridCommonProps {
  type: "album";
  item: {
    id: number;
    album_name: string;
    album_description: string;
    album_image: string;
    album_tracks: string[];
    album_release_date: string;
    music_video: string;
    artist_name: string;
    artist_image: string;
  };
}

type GridElementProps = GridArtistProps | GridAlbumProps;

const GridElement = (props: GridElementProps) => {
  if (props.type === "artists") {
    return (
      <Artist item={props.item} handleArtistClick={props.handleModalOpen} />
    );
  }
  if (props.type === "album") {
    return <></>; // 구현 예정
  }
};

export default GridElement;
