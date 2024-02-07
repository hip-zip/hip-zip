create table album
(
    id          bigint auto_increment primary key,
    name        varchar(255),
    image       varchar(255),
    release_date date,
    musicV_video  varchar(255),
    artist_id   bigint,
    created_at  timestamp(6),
    updated_at  timestamp(6),
    constraint fk_album_artist_id foreign key (artist_id) references artist (id)
);
