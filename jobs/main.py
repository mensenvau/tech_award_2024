import pymongo
import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv
load_dotenv()

# MySQL connection details
print("Loading mysql connection credentials")
mysql_host = os.getenv('MYSQL_HOST')
mysql_user = os.getenv('MYSQL_USERNAME')
mysql_password = os.getenv('MYSQL_PASSWORD')
mysql_database = os.getenv('MYSQL_DATABASE')

# MongoDB connection details
print("Loading and configuring Mongo connection")
mongo_uri = os.getenv("URI")
mongo_client = pymongo.MongoClient(mongo_uri)
mongo_db = mongo_client["jobs"]
mongo_collection = mongo_db["jobs"]


# Fetch data from MongoDB
print("Collecting data from mongodb...")
mongo_data = list(mongo_collection.find())

# Function to insert MongoDB data into MySQL
def insert_into_mysql(data):
    try:
        count = 0
        # Establish MySQL connection
        connection = mysql.connector.connect(
            host=mysql_host,
            user=mysql_user,
            password=mysql_password,
            database=mysql_database
        )

        if connection.is_connected():
            print("MySQL connected.")
            cursor = connection.cursor()

            # Define MySQL insert queries
            jobs_query = """
                INSERT INTO jobs 
                (is_job_vacancy, msg_id, job_name, company_name, job_type, job_salary, job_descriptions, input_language, jobs_date) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            
            job_locations_query = """
                INSERT INTO job_locations 
                (job_id, country_code, country, city, full_address, is_remote_work) 
                VALUES (%s, %s, %s, %s, %s, %s)
            """

            contact_information_query = """
                INSERT INTO contact_information 
                (job_id, type, value) 
                VALUES (%s, %s, %s)
            """

            job_responsibilities_query = """
                INSERT INTO job_responsibilities 
                (job_id, responsibility) 
                VALUES (%s, %s)
            """
            requirement_skills_query = """
                INSERT INTO requirement_skills 
                (job_id, skill) 
                VALUES (%s, %s)
            """

            occupations_skills_query = """
                INSERT INTO occupations 
                (job_id, occupation) 
                VALUES (%s, %s)
            """

            additional_comments_query = """
                INSERT INTO additional_comments 
                (job_id, comment) 
                VALUES (%s, %s)
            """

            search_keywords_query = """
                INSERT INTO search_keywords 
                (job_id, keyword) 
                VALUES (%s, %s)
            """

            print("Loading data into MySQL")
            # Insert each document from MongoDB into MySQL
            for job_data in data:
                # Assigning values to variables
                is_job_vacancy = job_data["is_job_vacancy"]
                message_id = str(job_data["message_id"])
                job_name = job_data["job_name"]
                company_name = job_data["company_name"]
                job_location = job_data["job_location"]
                job_type = job_data["job_type"]
                job_salary = job_data["job_salary"]
                job_descriptions = job_data["job_descriptions"]
                job_responsibilities = job_data["job_responsibilities"]
                requirement_skills = job_data["requirement_skills"]
                occupations = job_data["occupations"]
                additional_comments = job_data["additional_comments"]
                contact_informations = job_data["contact_informations"]
                input_language = job_data["input_language"]
                search_keywords = job_data["search_keywords"]
                createdAt = job_data["createdAt"]

                # Extracting job location details into separate variables
                job_country_code = job_location["country_code"]
                job_country = job_location["country"]
                job_city = job_location["city"]
                job_full_address = job_location["full_address"]
                job_is_remote_work = job_location["is_remote_work"]

                print(f"{count + 1} {job_name}")
                
                # jobs table
                cursor.execute(jobs_query, (
                    is_job_vacancy,
                    str(message_id),
                    job_name,
                    company_name,
                    job_type,
                    job_salary,
                    job_descriptions,
                    input_language,
                    createdAt
                ))
                current_job_id = cursor.lastrowid

                # locations table
                cursor.execute(job_locations_query, (
                        current_job_id,
                        job_country_code,
                        job_country,
                        job_city,
                        job_full_address,
                        job_is_remote_work
                ))
                
                # contact info
                for info in contact_informations:
                    cursor.execute(contact_information_query, (
                        current_job_id,
                        info['type'],
                        info['value']
                    ))

                # info responsibilities
                for info in job_responsibilities:
                    cursor.execute(job_responsibilities_query, (
                        current_job_id,
                        info
                    ))

                # requirement skills
                for info in requirement_skills:
                    cursor.execute(requirement_skills_query, (
                        current_job_id,
                        info
                    ))
                
                # occupations
                for info in occupations:
                    cursor.execute(occupations_skills_query, (
                        current_job_id,
                        info
                    ))

                # comments
                for info in additional_comments:
                    cursor.execute(additional_comments_query, (
                        current_job_id,
                        info
                    ))
                
                # search keywords
                for info in search_keywords:
                    cursor.execute(search_keywords_query, (
                        current_job_id,
                        info
                    ))
                count += 1

            # Commit the transaction
            connection.commit()
            print(f"{cursor.rowcount} records ({count}) inserted successfully into MySQL table")

    except Error as e:
        print(f"Error while connecting to MySQL: {e}")
    
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")


# Call the function to insert data into MySQL
insert_into_mysql(mongo_data)
