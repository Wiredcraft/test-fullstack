from django.apps import AppConfig


class LightningTalkConfig(AppConfig):
    name = 'lightning_talk'
    verbose_name = 'Lightning Talk'

    def ready(self):
        from .signals import create_auth_token
