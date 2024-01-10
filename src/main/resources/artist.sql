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

create table artist_hash_tag
(
    id          bigint auto_increment primary key,
    artist_id   bigint,
    hash_tag_id bigint,
    name        varchar(255),
    created_at  timestamp(6),
    updated_at  timestamp(6),
    constraint fk_artist_hash_tag_artist_id foreign key (artist_id) references artist (id),
    constraint fk_artist_hash_tag_hash_tag_id foreign key (hash_tag_id) references hash_tag (id)

);

create table hash_tag
(
    id         bigint auto_increment primary key,
    name       varchar(255),
    created_at timestamp(6),
    updated_at timestamp(6)
);

