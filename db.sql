drop database if exists tech_award_2024;
create database tech_award_2024;
use tech_award_2024;

drop table if exists channels;
create table channels (
    id int auto_increment primary key, -- Auto-incrementing primary key
    chat_id varchar(255) not null unique, -- Equivalent to MongoDB String, with UNIQUE constraint
    group_id varchar(255) not null unique, -- Equivalent to MongoDB String, with UNIQUE constraint
    username varchar(255) not null, -- Equivalent to MongoDB String
    title varchar(255) not null, -- Equivalent to MongoDB String
    description text, -- Equivalent to MongoDB String, optional
    member_count int not null default 0, -- Equivalent to MongoDB Number with a default value of 0
    is_active boolean default true, -- Equivalent to MongoDB Boolean with a default value of true
    created_at datetime default current_timestamp, -- MongoDB timestamps: createdAt
    updated_at datetime default current_timestamp on update current_timestamp -- MongoDB timestamps: updatedAt
);

drop table if exists messages;
create table messages (
    id int auto_increment primary key, -- Auto-incrementing primary key
    msg_id varchar(255) not null unique, -- Equivalent to MongoDB String with unique constraint
    chat_id varchar(255) not null, -- Equivalent to MongoDB String
    group_id varchar(255) not null, -- Equivalent to MongoDB String
    content text not null, -- Equivalent to MongoDB String (for longer text)
    is_active boolean default false, -- Equivalent to MongoDB Boolean with default value
    created_at timestamp default current_timestamp, -- MongoDB timestamps: createdAt
    updated_at timestamp default current_timestamp on update current_timestamp -- MongoDB timestamps: updatedAt
);

-- Ensure that both `chat_id` and `group_id` are unique together
create unique index unique_chat_supergroup on channels (chat_id, group_id);

drop table if exists jobs;
create table jobs (
    id int auto_increment primary key, -- Auto-incrementing primary key
    is_job_vacancy boolean, -- Equivalent to MongoDB Boolean
    message_id varchar(255) unique, -- Reference to a Message table
    job_name varchar(255), -- Equivalent to MongoDB String
    company_name varchar(255), -- Equivalent to MongoDB String
    job_type varchar(255), -- Equivalent to MongoDB String
    job_salary varchar(255), -- Equivalent to MongoDB String
    job_descriptions text, -- Equivalent to MongoDB String for longer text
    input_language varchar(50), -- Equivalent to MongoDB String
    jobs_date date,  -- MongoDB timestamps: createdAt
    created_at datetime default current_timestamp, -- today
    updated_at datetime default current_timestamp on update current_timestamp -- MongoDB timestamps: updatedAt
);

drop table if exists job_locations;
create table job_locations (
    id int auto_increment primary key, -- Auto-incrementing primary key
    job_id int, -- Foreign key referencing jobs table
    country_code varchar(10), -- Equivalent to MongoDB String
    country varchar(255), -- Equivalent to MongoDB String
    city varchar(255), -- Equivalent to MongoDB String
    full_address text, -- Longer text for the full address
    is_remote_work boolean, -- Equivalent to MongoDB Boolean
    foreign key (job_id) references jobs(id) on delete cascade -- Establishing foreign key relationship
);

drop table if exists contact_informations;
create table contact_informations (
    id int auto_increment primary key, -- Auto-incrementing primary key
    job_id int, -- Foreign key referencing jobs table
    type varchar(255) not null, -- Equivalent to MongoDB String
    value varchar(255) not null, -- Equivalent to MongoDB String
    foreign key (job_id) references jobs(id) on delete cascade -- Establishing foreign key relationship
);

drop table if exists job_responsibilities;
create table job_responsibilities (
    id int auto_increment primary key, -- Auto-incrementing primary key
    job_id int, -- Foreign key referencing jobs table
    responsibility text, -- Equivalent to MongoDB String (for longer text)
    foreign key (job_id) references jobs(id) on delete cascade -- Establishing foreign key relationship
);

drop table if exists requirement_skills;
create table requirement_skills (
    id int auto_increment primary key, -- Auto-incrementing primary key
    job_id int, -- Foreign key referencing jobs table
    skill varchar(255), -- Equivalent to MongoDB String
    foreign key (job_id) references jobs(id) on delete cascade -- Establishing foreign key relationship
);

drop table if exists occupations;
create table occupations (
    id int auto_increment primary key, -- Auto-incrementing primary key
    job_id int, -- Foreign key referencing jobs table
    occupation varchar(255), -- Equivalent to MongoDB String
    foreign key (job_id) references jobs(id) on delete cascade -- Establishing foreign key relationship
);

drop table if exists additional_comments;
create table additional_comments (
    id int auto_increment primary key, -- Auto-incrementing primary key
    job_id int, -- Foreign key referencing jobs table
    comment text, -- Equivalent to MongoDB String (for longer text)
    foreign key (job_id) references jobs(id) on delete cascade -- Establishing foreign key relationship
);

drop table if exists search_keywords;
create table search_keywords (
    id int auto_increment primary key, -- Auto-incrementing primary key
    job_id int, -- Foreign key referencing jobs table
    keyword varchar(255), -- Equivalent to MongoDB String
    foreign key (job_id) references jobs(id) on delete cascade -- Establishing foreign key relationship
);

drop view if exists vw_jobs;
create view vw_jobs as (
    select jobs.*, jl.city, jl.country, jl.country_code from jobs
    inner join job_locations jl on jobs.id = jl.job_id
);


select * from vw_jobs where is_job_vacancy = true and (city like '%uz%' or country like '%uz%') limit 10, 20


# YANGI HAYOT ...
drop table if exists users;
create table users (
    id int unsigned auto_increment primary key,
    phone_num varchar(255) unique null,
    first_name varchar(255) null,
    last_name varchar(255)  null,
    birth_date date,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

drop table if exists sms_code;
create table sms_code (
     id int unsigned auto_increment primary key,
     user_id int,
     code int,
     status int default 0,
     foreign key (id) references users(id) on delete cascade
);


drop view if exists vw_by_country;
create view vw_by_country as
select city, count(*) as count from job_locations
group by city
order by count desc
limit 10;
