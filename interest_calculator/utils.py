def calculate_projections(initial_amount: float, monthly_deposit: float, interest_rate: float, months: int = 600) -> dict:
    """
    Calculate compound interest projections over a specified number of months.
    
    Args:
        initial_amount (float): The starting balance
        monthly_deposit (float): The amount deposited each month
        interest_rate (float): Annual interest rate as a percentage
        months (int): Number of months to project (default: 600 = 50 years)
        
    Returns:
        dict: A dictionary containing:
            - projections: List of monthly balances with month number and value
            - summary: Dictionary with total contributions, earnings, and final savings
    """
    # Convert annual interest rate to monthly rate
    monthly_rate = (interest_rate / 100) / 12
    
    # Initialise tracking variables
    projections = []
    current_balance = initial_amount
    total_contributions = initial_amount  # Start with initial amount
    total_earnings = 0
    
    # Calculate projections for each month
    for month in range(1, months + 1):
        # Add monthly deposit to balance and track total contributions
        current_balance += monthly_deposit
        total_contributions += monthly_deposit
        
        # Calculate and add monthly interest
        interest = current_balance * monthly_rate
        current_balance += interest
        total_earnings += interest
        
        # Record monthly projection
        projections.append({
            "month": month,
            "value": round(current_balance, 2)
        })
    
    return {
        "projections": projections,
        "summary": {
            "contributions": round(total_contributions, 2),
            "earnings": round(total_earnings, 2),
            "savings": round(current_balance, 2)
        }
    }
