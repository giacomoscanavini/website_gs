import pandas as pd

def restaurant_growth(customer: pd.DataFrame) -> pd.DataFrame:
    customer = customer.groupby(by='visited_on', as_index=False)['amount'].sum()

    nDays = 7
    customer['amount'] = customer.amount.rolling(nDays).sum()
    customer['average_amount'] = (customer.amount / nDays).round(2)

    return customer.dropna()