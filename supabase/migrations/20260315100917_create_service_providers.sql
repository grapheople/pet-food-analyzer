-- 서비스 제공자 테이블
create type service_provider_category as enum ('동물미용', '동물병원', '동물호텔', '용품판매점');

create table service_providers (
  id bigint generated always as identity primary key,
  email text not null unique,
  name text not null,
  password text not null,
  category service_provider_category not null,
  country text,
  city text,
  address1 text,
  address2 text,
  phone text,
  instagram_url text,
  website_url text,
  profile_image_urls jsonb default '[]'::jsonb,
  description text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table service_providers enable row level security;
