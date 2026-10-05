import pandas as pd

def monthly_transactions(transactions: pd.DataFrame) -> pd.DataFrame:
    transactions['approved'] = transactions.state == 'approved'
    transactions['month'] = transactions.trans_date.dt.strftime("%Y-%m")
    transactions['approved_amount'] = transactions['approved'] * transactions['amount']

    return transactions.groupby(by=['month', 'country'], dropna=False).agg(
        trans_count = ('amount', 'size'),
        approved_count = ('approved', 'sum'),
        trans_total_amount = ('amount', 'sum'),
        approved_total_amount = ('approved_amount', 'sum')
    ).reset_index()