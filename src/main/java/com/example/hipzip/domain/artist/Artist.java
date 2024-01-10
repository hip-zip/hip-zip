package com.example.hipzip.domain.artist;

import com.example.hipzip.domain.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
    @OneToMany(mappedBy = "group")
    private List<Artist> members = new ArrayList<>();

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

    public void setName(final String name) {
        this.name = name;
    }

    public void setImage(final String image) {
        this.image = image;
    }

    public void modifyGroup(final Artist group) {
        if (artistType == ArtistType.GROUP) {
            throw new IllegalArgumentException("그룹 아티스트는 그룹을 수정할 수 없습니다.");
        }
        if (group.artistType == ArtistType.SOLO) {
            throw new IllegalArgumentException("솔로 아티스트를 그룹으로 수정할 수 없습니다.");
        }

        this.group = group;
    }

    public void modifyGroupMember(final List<Artist> members) {
        if (artistType == ArtistType.SOLO) {
            throw new IllegalArgumentException("솔로 아티스트는 멤버를 추가할 수 없습니다.");
        }
        for (Artist member : members) {
            if (member.artistType == ArtistType.GROUP) {
                throw new IllegalArgumentException("그룹 아티스트를 멤버로 추가할 수 없습니다.");
            }
            member.modifyGroup(this);
        }

        this.members = members;
    }
}
