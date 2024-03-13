package com.example.hipzip.domain.album;

import com.example.hipzip.domain.BaseEntity;
import com.example.hipzip.domain.artist.Artist;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Album extends BaseEntity {

    private String name;
    private String image;
    private LocalDate releaseDate;
    private String musicVideo;
    @ManyToOne
    private Artist artist;
    @OneToMany(mappedBy = "album", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AlbumVote> albumVotes;

    @Builder
    public Album(final String name, final String image, final LocalDate releaseDate, final String musicVideo,
                 final Artist artist) {
        this.name = name;
        this.image = image;
        this.releaseDate = releaseDate;
        this.musicVideo = musicVideo;
        this.artist = artist;
        artist.addAlbum(this);
        this.albumVotes = new ArrayList<>();
    }

    public void update(
            final String name,
            final String image,
            final LocalDate releaseDate,
            final String musicVideo,
            final Artist artist
    ) {
        this.name = name;
        this.image = image;
        this.releaseDate = releaseDate;
        this.musicVideo = musicVideo;
        this.artist = artist;
        artist.getAlbums()
                .remove(this);
        artist.addAlbum(this);
    }

    public void increaseVoteCount(final Long userId, final Long count) {
        AlbumVote albumVote = albumVotes.stream()
                .filter(vote -> vote.getUserId() == userId).findFirst()
                .orElseGet(() -> new AlbumVote(this, userId));
        albumVote.increaseViewCount(count);
        albumVotes.add(albumVote);
    }

    public long calculateTotalVotes() {
        return albumVotes.stream()
                .mapToLong(AlbumVote::getCount)
                .sum();
    }
}
