def calculate_projections(initial_amount: float, monthly_deposit: float, interest_rate: float, months: int = 600) -> list[dict]:
    """
    Calculate compound interest projections over a specified number of months.
    
    Args:
        initial_amount (float): The starting balance
        monthly_deposit (float): The amount deposited each month
        interest_rate (float): Annual interest rate as a percent
        months (int): Number of months to project (default: 600 = 50 years)
        
    Returns:
        list[dict]: A list of dictionaries containing month number and projected value
    """
    monthly_rate = (interest_rate / 100) / 12
    projections = []
    current_balance = initial_amount
    
    for month in range(1, months + 1):
        # Add monthly deposit
        current_balance += monthly_deposit
        
        # Calculate interest for the month and add it to the balance
        interest = current_balance * monthly_rate
        current_balance += interest
        
        # Add to projections
        projections.append({
            "month": month,
            "value": round(current_balance, 2)
        })
    
    return projections
