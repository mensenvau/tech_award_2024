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

            # Define MySQL insert query
            insert_query = """
                INSERT INTO jobs 
                (is_job_vacancy, tg_message_id, job_name, company_name, job_type, job_salary, job_descriptions, input_language, jobs_date) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            print("Loading data into MySQL")
            # Insert each document from MongoDB into MySQL
            for job in data:
                print(f"{count + 1} {job['job_name']}")
                
                cursor.execute(insert_query, (
                    job['is_job_vacancy'],
                    str(job['message_id']),
                    job['job_name'],
                    job['company_name'],
                    job['job_type'],
                    job['job_salary'],
                    job['job_descriptions'],
                    job['input_language'],
                    job['createdAt']
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
