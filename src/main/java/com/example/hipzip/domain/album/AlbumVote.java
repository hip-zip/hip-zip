package com.example.hipzip.domain.album;

import com.example.hipzip.domain.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AlbumVote extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "album_id")
    private Album album;
    private Long userId;
    private Long count;

    public AlbumVote(final Album album, final Long userId) {
        this.album = album;
        this.userId = userId;
        this.count = 0L;
    }

    public void increaseViewCount(final Long count) {
        this.count += count;
    }
}
