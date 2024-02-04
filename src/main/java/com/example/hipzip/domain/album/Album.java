package com.example.hipzip.domain.album;

import com.example.hipzip.domain.BaseEntity;
import com.example.hipzip.domain.artist.Artist;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
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
    LocalDateTime releaseDate;
    String musicVideo;
    @ManyToOne
    Artist artist;
}
