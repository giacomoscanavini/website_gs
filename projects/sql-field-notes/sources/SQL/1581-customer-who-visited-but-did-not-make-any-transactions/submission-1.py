import pandas as pd

def find_customers(visits: pd.DataFrame, transactions: pd.DataFrame) -> pd.DataFrame:
    df = visits.merge(transactions, on='visit_id', how='left')
    df = df[df.amount.isna()]
    return df.groupby(by='customer_id')['amount'].agg(count_no_trans = 'size').reset_index()