from mongoengine import connect
import os

connect(
    db="hrms_db",
    host=os.getenv(
        "MONGO_URI",
        "mongodb+srv://HRMS-User:RADyJkjqbda7TK2X@hrms.hwrm6uj.mongodb.net/?appName=HRMS"
    )
)
