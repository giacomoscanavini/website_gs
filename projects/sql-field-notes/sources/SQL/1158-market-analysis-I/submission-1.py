import pandas as pd

def market_analysis(users: pd.DataFrame, orders: pd.DataFrame, items: pd.DataFrame) -> pd.DataFrame:
    orders = orders[(orders.order_date >= '2019-01-01') & (orders.order_date <= '2019-12-31')]
    df = orders.groupby(by='buyer_id').agg(
        orders_in_2019 = ('buyer_id', 'size')
    ).reset_index()

    df = users.merge(df, left_on='user_id', right_on='buyer_id', how='left')
    df = df[['user_id', 'join_date', 'orders_in_2019']]
    df = df.rename(columns={'user_id': 'buyer_id'})
    
    return df.fillna(0)
    