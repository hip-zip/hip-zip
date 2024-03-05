package com.example.hipzip.application;

import com.example.hipzip.DatabaseClearExtension;
import com.example.hipzip.application.dto.album.AlbumVoteRequest;
import com.example.hipzip.domain.AlbumFixture;
import com.example.hipzip.domain.ArtistFixture;
import com.example.hipzip.domain.album.Album;
import com.example.hipzip.domain.album.AlbumRepository;
import com.example.hipzip.domain.artist.Artist;
import com.example.hipzip.domain.artist.ArtistRepository;
import jakarta.persistence.EntityManager;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@SuppressWarnings("NonAsciiCharacters")
@ExtendWith(DatabaseClearExtension.class)
@SpringBootTest(webEnvironment = WebEnvironment.NONE)
class AlbumServiceTest {

    @Autowired
    private ArtistRepository artistRepository;
    @Autowired
    private AlbumRepository albumRepository;
    @Autowired
    private AlbumService albumService;
    @Autowired
    private EntityManager entityManager;

    @Test
    void 앨범을_투표할_수_있다() {
        //given
        Artist 아이브 = artistRepository.save(ArtistFixture.IVE());
        Album WAVE = albumRepository.save(AlbumFixture.WAVE_앨범(아이브));
        AlbumVoteRequest albumVoteRequest = new AlbumVoteRequest(3L);

        //when
        albumService.addVote(WAVE.getId(), 아이브.getId(), albumVoteRequest);

        //then
        Assertions.assertThat(albumService.findById(WAVE.getId()).vote()).isEqualTo(3L);
    }
}
