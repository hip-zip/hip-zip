package com.example.hipzip.domain.album;

import com.example.hipzip.domain.BaseEntity;
import com.example.hipzip.domain.artist.Artist;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Album extends BaseEntity {

    String name;
    String image;
    LocalDate releaseDate;
    String musicVideo;
    @ManyToOne
    Artist artist;

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
    }
}
