create table users
(
    id         bigint auto_increment primary key,
    email      varchar(255),
    created_at timestamp(6),
    updated_at timestamp(6)
);
