package com.example.hipzip.application;

import com.example.hipzip.application.dto.ArtistListResponse;
import com.example.hipzip.application.dto.ArtistModifyRequest;
import com.example.hipzip.application.dto.ArtistSaveRequest;
import com.example.hipzip.domain.artist.Artist;
import com.example.hipzip.domain.artist.ArtistHashTag;
import com.example.hipzip.domain.artist.ArtistHashTagRepository;
import com.example.hipzip.domain.artist.ArtistRepository;
import com.example.hipzip.domain.artist.ArtistType;
import com.example.hipzip.domain.artist.HashTag;
import com.example.hipzip.domain.artist.HashTagRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ArtistService {

    private final ArtistRepository artistRepository;
    private final HashTagRepository hashTagRepository;
    private final ArtistHashTagRepository artistHashTagRepository;

    public Long saveArtist(ArtistSaveRequest request) {
        Artist artist = artistRepository.save(request.toArtist());

        addHashTag(request.artistTags(), artist);
        return artist.getId();
    }

    private HashTag findHashTag(final String name) {
        HashTag hashTag = hashTagRepository.findByName(name);
        if (hashTag != null) {
            return hashTag;
        }
        return hashTagRepository.save(new HashTag(name));
    }

    public List<ArtistListResponse> findArtist(String name) {
        HashTag hashTag = hashTagRepository.findByName(name);

        if (hashTag == null) {
            return new ArrayList<>();
        }

        List<ArtistHashTag> artistHashTags = hashTag.getArtistHashTags();

        return artistHashTags.stream()
                .map(ArtistHashTag::getArtist)
                .map(ArtistListResponse::from)
                .collect(Collectors.toList());
    }

    public void editArtist(ArtistModifyRequest request) {
        Artist artist = artistRepository.findById(request.id())
                .orElseThrow(() -> new IllegalArgumentException("아티스트를 찾을 수 없습니다."));

        artist.setName(request.name());
        artist.setImage(request.image());

        if (artist.getArtistType() == ArtistType.GROUP) {
            List<Artist> artists = request.artistGroupMemberIds()
                    .stream()
                    .map(
                            id -> artistRepository.findById(id)
                                    .orElseThrow(() -> new IllegalArgumentException("아티스트를 찾을 수 없습니다."))
                    )
                    .collect(Collectors.toList());

            artist.modifyGroupMember(artists);
        }

        artistHashTagRepository.deleteAllByArtist_Id(artist.getId());
        addHashTag(request.artistTags(), artist);
    }

    private void addHashTag(final List<String> request, final Artist artist) {
        List<HashTag> hashTags = request
                .stream()
                .map(this::findHashTag)
                .collect(Collectors.toList());

        for (HashTag hashTag : hashTags) {
            ArtistHashTag artistHashTag = new ArtistHashTag(artist, hashTag);
            artistHashTagRepository.save(artistHashTag);
        }
    }
}
