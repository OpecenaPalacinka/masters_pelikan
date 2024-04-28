create table if not exists roles
(
    role_id serial
        constraint roles_pk
            primary key,
    name    varchar(50)
);

alter table roles
    owner to root;

create table if not exists users
(
    user_id   serial
        constraint users_pk
            primary key,
    firstname varchar(55),
    lastname  varchar(100),
    email     varchar(150) not null,
    password  varchar(150) not null,
    role_id   integer      not null
        constraint users_roles_role_id_fk
            references roles,
    registred timestamp    not null
);

alter table users
    owner to root;

create table if not exists sentiment
(
    sentiment_id serial
        constraint sentiment_pk
            primary key,
    name         varchar(255) not null
);

alter table sentiment
    owner to root;

create table if not exists events
(
    event_id     serial
        constraint events_pk
            primary key,
    user_id      integer   not null
        constraint events_users_user_id_fk
            references users,
    happened     timestamp not null,
    ended        timestamp,
    description  varchar(255),
    label        varchar(255),
    sentiment_id integer
        constraint events_sentiment_sentiment_id_fk
            references sentiment
);

alter table events
    owner to root;

create table if not exists event_types
(
    event_type_id serial
        constraint event_types_pk
            primary key,
    name          varchar(255) not null,
    duration      integer      not null,
    user_id       integer
        constraint event_types_users_user_id_fk
            references users,
    custom        boolean,
    accepted      boolean
);

alter table event_types
    owner to root;

create table if not exists events_to_types
(
    events_to_types_id serial
        constraint events_to_types_pk
            primary key,
    event_id           integer not null
        constraint events_to_types_events_event_id_fk
            references events,
    event_type_id      integer not null
        constraint events_to_types_event_types_event_type_id_fk
                    references event_types
);

alter table events_to_types
    owner to root;

create table if not exists causality_types
(
    causality_types_id serial
        constraint causality_types_pk
            primary key,
    name               varchar(255) not null
);

alter table causality_types
    owner to root;

create table if not exists causalities
(
    causality_id      serial
        constraint causalities_pk
            primary key,
    event_id          integer not null
        constraint causalities_events_event_id_fk
            references events,
    causality_type_id integer not null
        constraint causalities_causality_types_causality_types_id_fk
            references causality_types,
    antecedent        integer,
    succedent         integer
);

alter table causalities
    owner to root;

create table if not exists antecedents_succedents
(
    id              serial
        constraint antecedents_succedents_pk
            primary key,
    event_type_id   integer not null,
    related_type_id integer not null,
    relationship    integer not null,
    event_id        integer not null
);

alter table antecedents_succedents
    owner to root;

