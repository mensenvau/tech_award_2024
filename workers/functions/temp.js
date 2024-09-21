let template = `- I am analyzing a telegram post to determine if it contains job vacancies.
- Validate the content and prepare a structured response and please fill in all the information, do not leave empty fields..
- Please do not translate the post.
- Respond in Uzbek.

Telegram post (markdown): "#message_content".

Response should be in JSON format, structured as follows:
{
  "is_job_vacancy": Boolean, // Set to true if there is a job vacancy
  "job_name": { "type": String, "required": true },
  "company_name": { "type": String, "required": true },
  "job_location": {
    "country_code": { "type": String, "required": true },
    "country": { "type": String, "required": true },
    "city": String,
    "full_address": String,
    "is_remote_work": Boolean
  },
  "job_type": "Full-Time" or "Part-Time" or "Temporary" or "Contract" or "Internship" or "Freelance" or "Remote" or "On-Site" or "Seasonal" or "Gig",
  "job_salary": { "type": String, "required": true, "maxlength": 20 },
  "job_descriptions":String,
  "job_responsibilities": [String],
  "requirement_skills": [String],
  "occupations": [String],
  "additional_comments": [String],
  "contact_informations": [
      { 
         "type": "email" || "phone" || "instagram" || "whatsapp" || "telegram" || "url" || "any",
         "value": String // The actual contact information, e.g., URL or phone number
      }
  ],
  "input_language": "uz" or "ru" or "en",
  "search_keywords": [String]
}`;

module.exports = { template };
