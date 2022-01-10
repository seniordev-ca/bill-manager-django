from rest_framework import serializers
from .models import * 

# Current Serializer
class CurrentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Current 
    fields = '__all__'


# Historical Serializer
class HistoricalSerializer(serializers.ModelSerializer):
  class Meta:
    model = Historical 
    fields = '__all__'
