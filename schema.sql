-- ==========================================================
-- [Phase 2] PostgreSQL 데이터베이스 스키마 및 초기 데이터 설정
-- ==========================================================

-- 1. 카테고리 정보 테이블 (시간대: 점심, 저녁, 야식, 디저트)
CREATE TABLE time_categories (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL, -- lunch, dinner, lateNight, dessert
    name VARCHAR(50) NOT NULL         -- 점심, 저녁, 야식, 디저트
);

-- 2. 음식 종류 테이블 (한식, 일식, 중식, 양식, 기타)
CREATE TABLE food_types (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL, -- korean, japanese, chinese, western, others
    name VARCHAR(50) NOT NULL         -- 한식, 일식, 중식, 양식, 기타
);

-- 3. 메뉴 테이블
CREATE TABLE menus (
    id SERIAL PRIMARY KEY,
    time_category_code VARCHAR(50) NOT NULL REFERENCES time_categories(code) ON DELETE CASCADE,
    food_type_code VARCHAR(50) REFERENCES food_types(code) ON DELETE CASCADE, -- 디저트 등분류가 없는 경우 NULL 허용
    name VARCHAR(100) NOT NULL,
    emoji VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 추가 (빠른 필터링 검색을 위해)
CREATE INDEX idx_menus_category ON menus(time_category_code, food_type_code);

-- ==========================================================
-- 초기 데이터 (Seeding)
-- ==========================================================

-- 카테고리 (시간대) 데이터 삽입
INSERT INTO time_categories (code, name) VALUES 
('lunch', '점심'), ('dinner', '저녁'), ('lateNight', '야식'), ('dessert', '디저트');

-- 카테고리 (음식 종류) 데이터 삽입
INSERT INTO food_types (code, name) VALUES 
('korean', '한식'), ('japanese', '일식'), ('chinese', '중식'), ('western', '양식'), ('others', '기타');

-- 기본 메뉴 삽입 (샘플 - app.js에 있는 데이터 기준)
-- 점심
INSERT INTO menus (time_category_code, food_type_code, name, emoji) VALUES 
('lunch', 'korean', '김치찌개', '🥘'),
('lunch', 'korean', '된장찌개', '🍲'),
('lunch', 'korean', '비빔밥', '🥗'),
('lunch', 'japanese', '돈까스', '🍱'),
('lunch', 'japanese', '초밥', '🍣'),
('lunch', 'chinese', '짜장면', '🍝'),
('lunch', 'western', '햄버거', '🍔'),
('lunch', 'others', '쌀국수', '🍜');

-- 저녁
INSERT INTO menus (time_category_code, food_type_code, name, emoji) VALUES 
('dinner', 'korean', '삼겹살', '🥓'),
('dinner', 'korean', '곱창', '🔥'),
('dinner', 'japanese', '회', '🐟'),
('dinner', 'chinese', '탕수육', '🍗'),
('dinner', 'western', '피자', '🍕');

-- 디저트 (food_type_code 없음)
INSERT INTO menus (time_category_code, food_type_code, name, emoji) VALUES 
('dessert', NULL, '크로플', '🥐'),
('dessert', NULL, '마카롱', '🍪'),
('dessert', NULL, '탕후루', '🍓');

-- 참고: 실제 프로덕션 도입 시 app.js 의 전체 데이터를 이 테이블에 모두 매핑하여 넣습니다.
