package com.example.hipzip.application;

import com.example.hipzip.application.dto.ArtistDetailResponse;
import com.example.hipzip.application.dto.ArtistModifyRequest;
import com.example.hipzip.application.dto.ArtistResponse;
import com.example.hipzip.application.dto.ArtistSaveRequest;
import com.example.hipzip.domain.artist.Artist;
import com.example.hipzip.domain.artist.ArtistHashtag;
import com.example.hipzip.domain.artist.ArtistRepository;
import com.example.hipzip.domain.artist.ArtistType;
import com.example.hipzip.domain.artist.Hashtag;
import java.util.List;
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
    private final HashtagService hashtagService;
    private final ArtistHashtagService artistHashtagService;

    public Long save(ArtistSaveRequest request) {
        Artist artist = artistRepository.save(request.toArtist());
        createHashtag(request.hashtag(), artist);
        return artist.getId();
    }

    private void createHashtag(final List<String> tagNames, final Artist artist) {
        List<Hashtag> hashtags = hashtagService.findOrCreateHashtag(addArtistNameToTags(tagNames, artist));
        List<ArtistHashtag> artistHashtags = hashtags.stream()
                .map(it -> new ArtistHashtag(artist, it))
                .toList();
        artistHashtagService.saveAll(artistHashtags);
    }

    private static List<String> addArtistNameToTags(final List<String> tagNames, final Artist artist) {
        List<String> hashtag = tagNames;
        if (!hashtag.contains(artist.getName())) {
            hashtag.add(artist.getName());
        }
        return hashtag;
    }

    public List<ArtistResponse> findByName(String name) {
        List<Hashtag> hashTag = hashtagService.findByName(name);
        List<ArtistHashtag> artistHashtags = hashTag.stream()
                .flatMap(it -> it.getArtistHashtags().stream())
                .toList();

        return artistHashtags.stream()
                .map(ArtistHashtag::getArtist)
                .map(ArtistResponse::of)
                .distinct()
                .toList();
    }

    public List<ArtistResponse> findAll(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Direction.DESC, "id"));
        Page<Artist> artists = artistRepository.findAll(pageRequest);

        return artists.stream().map(ArtistResponse::of)
                .toList();
    }

    public ArtistDetailResponse findById(Long id) {
        Artist artist = artistRepository.getById(id);
        List<ArtistHashtag> artistHashtags = artistHashtagService.findByArtistId(id);
        List<String> hashtag = artistHashtags.stream()
                .map(it -> it.getHashtag().getName())
                .toList();

        return ArtistDetailResponse.of(artist, artist.getMembers(), hashtag);
    }

    public void edit(ArtistModifyRequest request) {
        Artist artist = artistRepository.getById(request.id());

        artist.setName(request.name());
        artist.setImage(request.image());

        if (artist.getArtistType() == ArtistType.GROUP) {
            List<Artist> artists = request.artistGroupMemberIds()
                    .stream()
                    .map(artistRepository::getById)
                    .toList();

            artist.modifyGroupMember(artists);
        }

        artistHashtagService.deleteAllByArtistId(artist.getId());

        createHashtag(request.hashtag(), artist);
    }

    public void deleteById(Long id) {
        Artist artist = artistRepository.getById(id);
        artistHashtagService.deleteAllByArtistId(artist.getId());
        artistRepository.deleteById(artist.getId());
    }
}
