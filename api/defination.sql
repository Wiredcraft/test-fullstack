create table users (
  name            text primary key,
  time_created    timestamp with time zone default CURRENT_TIMESTAMP
);

create table talks (
  id              serial primary key,
  title           text not null,
  description     text not null,
  time_created    timestamp with time zone default CURRENT_TIMESTAMP,
  username        text references users (name)
);
