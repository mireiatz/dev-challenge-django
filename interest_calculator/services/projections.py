def generate_projection_response(initial_amount: float, monthly_deposit: float, interest_rate: float, months: int = 600) -> dict:
    """
    Generate a complete projection response including summary statistics and monthly projections.
    
    Args:
        initial_amount (float): Initial investment amount
        monthly_deposit (float): Monthly deposit amount
        interest_rate (float): Annual interest rate as a percentage
        months (int, optional): Number of months to project. Defaults to 600 (50 years).
    
    Returns:
        dict: Dictionary containing summary statistics and monthly projections
    """
    # Calculate monthly projections
    projections = calculate_projections(initial_amount, monthly_deposit, interest_rate, months)
    
    # Calculate summary statistics
    final_value = projections[-1]["value"] if projections else 0.0
    total_contributions = initial_amount + (monthly_deposit * months)
    earnings = final_value - total_contributions
    
    return {
        "summary": {
            "savings": final_value,
            "contributions": total_contributions,
            "earnings": earnings,
        },
        "projections": projections
    } 

def calculate_projections(initial_amount: float, monthly_deposit: float, interest_rate: float, months: int = 600) -> list[dict[str, float]]:
    """
    Calculate monthly investment projections based on initial amount, monthly deposits, and interest rate.
    
    Args:
        initial_amount (float): Initial investment amount
        monthly_deposit (float): Monthly deposit amount
        interest_rate (float): Annual interest rate as a percentage
        months (int, optional): Number of months to project. Defaults to 600 (50 years).
    
    Returns:
        list[float]: List of projected values for each month
    """
    projections = []
    current_balance = initial_amount
    monthly_rate = (interest_rate / 100) / 12

    for month in range(1, months + 1):
        current_balance += monthly_deposit
        interest = current_balance * monthly_rate
        current_balance += interest

        projections.append({
            "month": month,
            "value": round(current_balance, 2)
        })

    return projections