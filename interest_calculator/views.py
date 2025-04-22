from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import json
from .utils import calculate_projections

@require_POST
@csrf_exempt
def interest_data(request):
    try:
        # Parse JSON data from request body
        data = json.loads(request.body)
        
        # Validate required fields
        required_fields = ['initial_amount', 'monthly_deposit', 'interest_rate']
        for field in required_fields:
            if field not in data:
                return JsonResponse(
                    {'error': f'Missing required field: {field}'},
                    status=400
                )
        
        # Convert and validate numeric values
        try:
            initial_amount = float(data['initial_amount'])
            monthly_deposit = float(data['monthly_deposit'])
            interest_rate = float(data['interest_rate'])
        except (ValueError, TypeError):
            return JsonResponse(
                {'error': 'All numeric fields must be valid numbers'},
                status=400
            )
        
        # Validate non-negative values
        if initial_amount < 0 or monthly_deposit < 0 or interest_rate < 0:
            return JsonResponse(
                {'error': 'All numeric fields must be non-negative'},
                status=400
            )
        
        # Calculate projections
        response = generate_projection_response(
            initial_amount=initial_amount,
            monthly_deposit=monthly_deposit,
            interest_rate=interest_rate
        )
        
        return JsonResponse(response)
        
    except json.JSONDecodeError:
        return JsonResponse(
            {'error': 'Invalid JSON data'},
            status=400
        )