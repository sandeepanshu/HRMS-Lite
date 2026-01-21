from django.apps import AppConfig
import os

class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'

    def ready(self):
        MONGO_URI = os.getenv("MONGO_URI")

        if not MONGO_URI:
            # Log but don't crash production
            print("WARNING: MONGO_URI not set. MongoDB not connected.")
            return

        from mongoengine import connect

        try:
            connect(
                db="hrms_db",
                host=MONGO_URI,
                alias="default"
            )
            print("MongoDB connected successfully")
        except Exception as e:
            print("MongoDB connection failed:", str(e))
