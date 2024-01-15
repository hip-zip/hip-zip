package com.example.hipzip.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.util.List;
import org.hibernate.validator.constraints.URL;

public record ArtistModifyRequest(
        @Positive(message = "유효하지 않은 아티스트 id 입니다")
        @NotNull(message = "아티스트 아이디를 입력해 주세요")
        Long id,
        @NotBlank(message = "이름을 입력해 주세요")
        String name,
        @URL(message = "올바른 URL이어야 합니다")
        String image,
        @Size(max = 10, message = "태그는 최대 10개까지 등록할 수 있습니다")
        List<String> artistTags,
        List<Long> artistGroupMemberIds
) {
}
