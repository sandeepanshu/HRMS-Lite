from mongoengine import connect
import os

MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise Exception("MONGO_URI not loaded from environment")

connect(
    db="hrms_db",
    host=MONGO_URI
)
