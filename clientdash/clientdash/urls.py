from django.contrib import admin
from django.conf.urls import url, include

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/auth/', include('accounts.urls')),
    url(r'^api/customer/', include('accounts.urls')),
    url(r'^api/', include('clients.urls')),
    url(r'^', include('frontend.urls'))
]
