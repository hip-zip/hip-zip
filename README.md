# [hip_zip](https://hip-zip.kro.kr)

## 서론

힙합을 좋아하는 사람이라면 한 번 즈음 들어 보셨을 법한 힙합 어워즈라는 시상식이 있습니다. 진정한 힙합 리스너들은 연말이 되면 올해 나온 앨범들을 쭈욱 되돌아보며, 누가 올해의 앨범을 받게 될 지에 대해서 토론을 하곤 합니다. 하지만 힙합의 스펙트럼이 넓어지게 되면서 올해 나온 앨범들을 한 번에 볼 수 없는 곳을 찾기가 힘들어졌고, 이를 해소하기 위해 사이트를 만들어 각 년도에 나온 힙합 앨범들을 보여주는 사이트를 만들면 좋을 것 같다는 생각이 들었습니다.

### 기술 스택

- `Next.js`
- `Typescript`
- `Supabase DB`
- `TailwindCSS`
-  `PWA (구현 완료)`

## UI
### 인트로
![](public/README/img.png)

### 리스트
![](public/README/img_1.png)

### 앨범 상세
![](public/README/img_2.png)

## 기능
- `Supabase`를 사용하여 앨범을 `Fetch`하는 기능
- `Subabase`를 사용하여 앨범을 `Post`하는 기능

## 추가 예정 기능
- Youtube PC / App Link 공유 시 `embed` 링크 변환
- 목록 스크롤 위치값 반영
- 무한 스크롤
- 앨범 검색 기능
  - 아티스트, 앨범 이름 순으로 순차 적용 예정
- Data Fetching Logic 수정
  - 공식 배포 전 수정 예정
- 상세 페이지 트랙리스트 & 아티스트 사진 & 앨범사진
  - UI 구상 중
  - 도와줄 무료 디자이너 구함
- 회원가입 기능
  - `kakao auth api` 고려 중
- 커뮤니티 기능
  - 자체 별점 기능
  - 댓글 기능

### 앨범 리스트 스키마

- `id: number`
- `album_name: string`
- `album_description: string`
- `album_image: string`
- `album_tracks: string[] - 각 트랙들 제목을 배열 형식으로 받을 예정`
- `album_release_date: string - '2020-10-10'와 같은 형태로 작성하여야 함`
- `music_video - iframe(embeded) 형식으로 유튜브로부터 가져올 예정`
- `artist_name: string`
- `artist_image: string`
