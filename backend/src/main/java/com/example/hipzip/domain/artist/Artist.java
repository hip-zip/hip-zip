package com.example.hipzip.domain.artist;

import com.example.hipzip.domain.BaseEntity;
import com.example.hipzip.domain.album.Album;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Artist extends BaseEntity {

    private String name;
    private String image;
    @Enumerated(value = EnumType.STRING)
    private ArtistType artistType;
    @ManyToOne
    @JoinColumn(name = "group_id")
    private Artist group;
    @OneToMany(mappedBy = "group", fetch = FetchType.EAGER)
    private List<Artist> members = new ArrayList<>();
    @OneToMany(mappedBy = "artist", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Album> albums = new ArrayList<>();

    @Builder
    public Artist(
            final String name,
            final String image,
            final ArtistType artistType
    ) {
        this.name = name;
        this.image = image;
        this.artistType = artistType;
    }

    public void update(
            final String name,
            final String image,
            final List<Artist> members
    ) {
        this.name = name;
        this.image = image;

        if (artistType == ArtistType.GROUP) {
            for (Artist member : this.members) {
                member.group = null;
            }

            for (Artist member : members) {
                if (member.artistType == ArtistType.GROUP) {
                    throw new IllegalArgumentException("그룹 아티스트를 멤버로 추가할 수 없습니다.");
                }
                member.group = this;
            }

            this.members = members;
        }
    }

    public void addAlbum(final Album album) {
        albums.add(album);
    }
}
