create table users (
  name            text primary key,
  time_created    timestamp with time zone default CURRENT_TIMESTAMP,
  password        text not null
);

create table talks (
  id              serial primary key,
  title           text not null,
  description     text not null,
  time_created    timestamp with time zone default CURRENT_TIMESTAMP,
  username        text references users (name),
  rating          smallint default 0 check (rating >= 0)
);

create table votes (
  username        text references users (name) on delete cascade,
  talk_id         int references talks (id) on delete cascade,
  unique          (username, talk_id)
);
