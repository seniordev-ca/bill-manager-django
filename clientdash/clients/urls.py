from rest_framework import routers
from django.conf.urls import url
from .api import *
from .views import *


router = routers.DefaultRouter()
router.register('currents', CurrentViewSet, 'currents')
router.register('historicals', HistoricalViewSet, 'historicals')

urlpatterns = [
    url(r'^info/$', info),
    url(r'^customers/$', get_customers),
    url(r'^bulk_currents/$', bulk_currents),
    url(r'^bulk_historicals/$', bulk_historicals),
    url(r'^bulk_settings/$', bulk_settings),
] + router.urls
