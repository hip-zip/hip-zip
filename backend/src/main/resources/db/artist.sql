create table artist
(
    id          bigint auto_increment primary key,
    name        varchar(255),
    image       varchar(255),
    group_id    bigint,
    artist_type varchar(255),
    created_at  timestamp(6),
    updated_at  timestamp(6)
);

create table hashtag
(
    id         bigint auto_increment primary key,
    name       varchar(255),
    created_at timestamp(6),
    updated_at timestamp(6)
);

create table artist_hashtag
(
    id          bigint auto_increment primary key,
    artist_id   bigint,
    hashtag_id bigint,
    created_at  timestamp(6),
    updated_at  timestamp(6),
    constraint fk_artist_hashtag_artist_id foreign key (artist_id) references artist (id),
    constraint fk_artist_hashtag_hashtag_id foreign key (hashtag_id) references hashtag (id)
);

