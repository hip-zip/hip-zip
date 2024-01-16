package com.example.hipzip.domain.artist;

import com.example.hipzip.domain.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Hashtag extends BaseEntity {

    private String name;
    @OneToMany(mappedBy = "hashtag")
    private List<ArtistHashtag> artistHashtags = new ArrayList<>();

    public Hashtag(final String name) {
        this.name = name;
    }

    public void addArtist(final ArtistHashtag artistHashtag) {
        artistHashtags.add(artistHashtag);
    }
}
