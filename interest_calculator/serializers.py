from rest_framework import serializers

class InterestDataSerializer(serializers.Serializer):
    # Input validation for interest calculation parameters
    initial_amount = serializers.FloatField(min_value=0)
    monthly_deposit = serializers.FloatField(min_value=0)
    interest_rate = serializers.FloatField(min_value=0) 