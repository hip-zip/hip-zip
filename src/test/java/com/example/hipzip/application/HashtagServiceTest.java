package com.example.hipzip.application;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.example.hipzip.domain.artist.Hashtag;
import com.example.hipzip.domain.artist.HashtagRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class HashtagServiceTest {

    @InjectMocks
    private HashtagService hashtagService;
    @Mock
    private HashtagRepository hashtagRepository;

    @Test
    void 해시태그_검색() {
        hashtagService.findByName("Bill Stax");

        verify(hashtagRepository).findByNameStartsWith("BILLSTAX");
    }

    @Test
    void 해시태그가_존재하는_경우_기존_해시태그_반환() {
        when(hashtagRepository.findByName("IVE")).thenReturn(new Hashtag("IVE"));

        hashtagService.findOrCreateHashtag(List.of("Ive"));

        verify(hashtagRepository, never()).save(any());
    }

    @Test
    void 해시태그가_존재하지_않는_경우_해시태그_생성() {
        when(hashtagRepository.findByName("IVE")).thenReturn(null);

        hashtagService.findOrCreateHashtag(List.of("Ive"));

        verify(hashtagRepository, times(1)).save(any());
    }
}
