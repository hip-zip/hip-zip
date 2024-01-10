package com.example.hipzip.application.dto;

import java.util.List;

public record ArtistModifyRequest(
        Long id,
        String name,
        String image,
        List<String> artistTags,
        List<Long> artistGroupMemberIds
) {
}
