package com.example.hipzip.application.dto;

import com.example.hipzip.config.validation.EnumValue;
import com.example.hipzip.domain.artist.Artist;
import com.example.hipzip.domain.artist.ArtistType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;
import org.hibernate.validator.constraints.URL;

public record ArtistSaveRequest(
        @NotBlank(message = "이름을 입력해 주세요")
        String name,
        @URL(message = "올바른 URL이어야 합니다")
        String image,
        @EnumValue(enumClass = ArtistType.class, message = "유효하지 않은 아티스트 타입입니다", ignoreCase = true)
        String artistType,
        @Size(max = 10, message = "태그는 최대 10개까지 등록할 수 있습니다")
        List<String> artistTags
) {

    public Artist toArtist() {
        return Artist.builder()
                .name(name)
                .image(image)
                .artistType(ArtistType.valueOf(artistType.toUpperCase()))
                .build();
    }
}
