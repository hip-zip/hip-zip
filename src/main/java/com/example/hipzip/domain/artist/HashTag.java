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
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HashTag extends BaseEntity {

    private String name;
    @OneToMany(mappedBy = "hashTag")
    private List<ArtistHashTag> artistHashTags = new ArrayList<>();

    public HashTag(final String name) {
        this.name = name;
    }

    public void addArtist(final ArtistHashTag artistHashTag) {
        artistHashTags.add(artistHashTag);
    }
}
