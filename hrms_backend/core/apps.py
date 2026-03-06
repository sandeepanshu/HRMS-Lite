from django.apps import AppConfig
import os

class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'

    def ready(self):
        import os
        from mongoengine import connect

        MONGO_URI = os.getenv("MONGO_URI")

        if not MONGO_URI:
            print("WARNING: MONGO_URI not set.")
            return

        connect(
            db="hrms_db",
            host=MONGO_URI,
            alias="default"
        )

        print("MongoDB connected successfully")