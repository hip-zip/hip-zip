package com.example.hipzip.domain.artist;

import com.example.hipzip.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ArtistTag extends BaseEntity {

    private String name;
    @ManyToOne
    private Artist artist;

    public ArtistTag(final String name) {
        this.name = name;
    }
}
