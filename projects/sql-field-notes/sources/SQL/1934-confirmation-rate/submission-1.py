import pandas as pd

def confirmation_rate(signups: pd.DataFrame, confirmations: pd.DataFrame) -> pd.DataFrame:
    df = signups.merge(confirmations, on='user_id', how='left')[['user_id', 'action']]
    df['confirmation_rate'] = df.action == 'confirmed'

    df = df[['user_id', 'confirmation_rate']].groupby(by='user_id').agg(
        total = ('confirmation_rate', 'size'),
        positive = ('confirmation_rate', 'sum')
    ).reset_index()

    df['confirmation_rate'] = (df['positive'] / df['total']).round(2)
    return df[['user_id', 'confirmation_rate']]