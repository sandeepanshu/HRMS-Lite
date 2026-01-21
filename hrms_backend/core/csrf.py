from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

def csrf_exempt_view(cls):
    cls.dispatch = method_decorator(csrf_exempt)(cls.dispatch)
    return cls
