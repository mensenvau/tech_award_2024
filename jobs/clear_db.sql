

select * from jobs where jobs.job_name is null or job_descriptions is null or company_name is null;
-- delete from jobs where jobs.job_name is null or jobs.job_descriptions is null and company_name is null;

select * from jobs where jobs.job_name = '' or jobs.job_descriptions = ''   ;
-- delete from jobs where jobs.job_name = '' or jobs.job_descriptions = '' or company_name = '';

-- update jobs set company_name = 'not defined' where  company_name = '' or company_name is null

select * from job_locations where country_code is null or city is null or country_code is null;
select * from job_locations where country_code = '' or city = '' or country_code = '';



update job_locations set city = 'Toshkent'
        where city in  ('', 'Тошкент', '')


update job_locations set country_code = 'UZ' where country_code is null or country_code = ''
