from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import json
from .services.projections import generate_projection_response
from .serializers import InterestDataSerializer

@require_POST
@csrf_exempt
def interest_data(request):
    try:
        # Parse JSON data from request body
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)

    # Validate data using serializer
    serializer = InterestDataSerializer(data=data)

    if not serializer.is_valid():
        return JsonResponse({'error': serializer.errors}, status=400)

    validated = serializer.validated_data

    # Generate projection response
    response = generate_projection_response(
        initial_amount=validated["initial_amount"],
        monthly_deposit=validated["monthly_deposit"],
        interest_rate=validated["interest_rate"]
    )

    return JsonResponse(response)