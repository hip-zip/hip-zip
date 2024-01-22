package com.example.hipzip.domain.artist;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.List;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

class ArtistTest {

    @Test
    void 그룹_아티스트는_멤버를_추가할_수_있다() {
        Artist IVE = ArtistFixture.IVE();
        Artist 장원영 = ArtistFixture.장원영();

        IVE.modifyGroupMember(List.of(장원영));

        Assertions.assertThat(IVE.getMembers()).contains(장원영);
    }

    @Test
    void 솔로_아티스트는_멤버를_추가할_수_없다() {
        Artist 장원영 = ArtistFixture.장원영();
        Artist 이서 = ArtistFixture.이서();

        assertThatThrownBy(() -> 장원영.modifyGroupMember(List.of(이서)))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("솔로 아티스트는 멤버를 추가할 수 없습니다.");
    }

    @Test
    void 그룹_아티스트를_그룹_멤버로_추가할_수_없다() {
        Artist IVE = ArtistFixture.IVE();
        Artist 르세라핌 = ArtistFixture.르세라핌();

        assertThatThrownBy(() -> IVE.modifyGroupMember(List.of(르세라핌)))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("그룹 아티스트를 멤버로 추가할 수 없습니다.");
    }

    @Test
    void 그룹_아티스트는_그룹을_수정할_수_없다() {
        Artist IVE = ArtistFixture.IVE();
        Artist 르세라핌 = ArtistFixture.르세라핌();

        assertThatThrownBy(() -> IVE.modifyGroup(르세라핌))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("그룹 아티스트는 그룹을 수정할 수 없습니다.");
    }

    @Test
    void 솔로_아티스트를_그룹으로_수정할_수_없다() {
        Artist 장원영 = ArtistFixture.장원영();
        Artist 이서 = ArtistFixture.이서();

        assertThatThrownBy(() -> 장원영.modifyGroup(이서))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("솔로 아티스트를 그룹으로 수정할 수 없습니다.");
    }
}
