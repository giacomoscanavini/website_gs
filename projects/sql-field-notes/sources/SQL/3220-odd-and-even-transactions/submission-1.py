import pandas as pd

def sum_daily_odd_even(transactions: pd.DataFrame) -> pd.DataFrame:
    flag_even = transactions['amount'] % 2 == 0
    transactions['amount_odd'] = ~flag_even * transactions['amount']
    transactions['amount_even'] = flag_even * transactions['amount']
    
    df = transactions.groupby(by='transaction_date').agg(
        odd_sum = ('amount_odd', 'sum'),
        even_sum = ('amount_even', 'sum')
    ).reset_index()

    return df


'''
def sum_daily_odd_even(transactions: pd.DataFrame) -> pd.DataFrame:
    transactions['odd_sum'] = transactions['amount'].apply(lambda x : x if x %2 != 0 else 0)
    transactions['even_sum'] = transactions['amount'].apply(lambda x: x if x %2 == 0 else 0)
    df = transactions.groupby('transaction_date', as_index = False)[['odd_sum', 'even_sum']].sum()
    return df
'''