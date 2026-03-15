-- service_providers → partners 테이블 이름 변경
-- enum 타입도 함께 변경

-- 테이블 이름 변경
alter table service_providers rename to partners;

-- enum 타입 이름 변경
alter type service_provider_category rename to partner_category;
