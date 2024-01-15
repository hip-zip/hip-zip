package com.example.hipzip.application;

import com.example.hipzip.application.dto.ArtistDetailResponse;
import com.example.hipzip.application.dto.ArtistResponse;
import com.example.hipzip.application.dto.ArtistModifyRequest;
import com.example.hipzip.application.dto.ArtistSaveRequest;
import com.example.hipzip.domain.artist.Artist;
import com.example.hipzip.domain.artist.ArtistHashtag;
import com.example.hipzip.domain.artist.ArtistHashtagRepository;
import com.example.hipzip.domain.artist.ArtistRepository;
import com.example.hipzip.domain.artist.ArtistType;
import com.example.hipzip.domain.artist.Hashtag;
import com.example.hipzip.domain.artist.HashtagRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ArtistService {

    private final ArtistRepository artistRepository;
    private final HashtagRepository hashTagRepository;
    private final ArtistHashtagRepository artistHashTagRepository;

    public Long saveArtist(ArtistSaveRequest request) {
        Artist artist = artistRepository.save(request.toArtist());

        addHashTag(request.hashtag(), artist);
        return artist.getId();
    }

    private Hashtag findHashTag(final String name) {
        Hashtag hashTag = hashTagRepository.findByName(name);
        if (hashTag != null) {
            return hashTag;
        }
        return hashTagRepository.save(new Hashtag(name));
    }

    public List<ArtistResponse> findArtist(String name, int page, int size) {
        if (name == null) {
            return findAll(page, size);
        }

        Hashtag hashTag = hashTagRepository.findByName(name);

        if (hashTag == null) {
            return new ArrayList<>();
        }

        List<ArtistHashtag> artistHashtags = hashTag.getArtistHashtags();

        return artistHashtags.stream()
                .map(ArtistHashtag::getArtist)
                .map(ArtistResponse::from)
                .collect(Collectors.toList());
    }

    private List<ArtistResponse> findAll(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Direction.DESC, "id"));
        Page<Artist> artists = artistRepository.findAll(pageRequest);

        return artists.stream().map(ArtistResponse::from)
                .collect(Collectors.toList());
    }

    public ArtistDetailResponse findArtistDetail(Long id) {
        Artist artist = artistRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("아티스트를 찾을 수 없습니다."));
        List<ArtistHashtag> artistHashtags = artistHashTagRepository.findByArtist_Id(id);
        List<String> hashtag = artistHashtags.stream()
                .map(it -> it.getHashTag().getName())
                .collect(Collectors.toList());

        return ArtistDetailResponse.from(artist, hashtag);
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
        addHashTag(request.hashtag(), artist);
    }

    private void addHashTag(final List<String> request, final Artist artist) {
        List<Hashtag> hashtags = request
                .stream()
                .map(this::findHashTag)
                .collect(Collectors.toList());

        for (Hashtag hashTag : hashtags) {
            ArtistHashtag artistHashTag = new ArtistHashtag(artist, hashTag);
            artistHashTagRepository.save(artistHashTag);
        }
    }
}
