package com.example.hipzip.domain.artist;

import com.example.hipzip.domain.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ArtistHashtag extends BaseEntity {

    @ManyToOne
    private Artist artist;
    @ManyToOne
    private Hashtag hashTag;

    public ArtistHashtag(final Artist artist, final Hashtag hashTag) {
        this.artist = artist;
        this.hashTag = hashTag;

        hashTag.addArtist(this);
    }
}
