from django.apps import AppConfig
import os

class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'

    def ready(self):
        from mongoengine import connect, disconnect_all

        MONGO_URI = os.getenv("MONGO_URI")

        if not MONGO_URI:
            print("WARNING: MONGO_URI not set. MongoDB will not connect.")
            return

        try:
            disconnect_all()  # Clear any stale connections (important for Gunicorn workers)
            connect(host=MONGO_URI, alias="default")  # URI already contains DB name
            print("✅ MongoDB connected successfully")
        except Exception as e:
            print(f"❌ MongoDB connection failed: {e}")