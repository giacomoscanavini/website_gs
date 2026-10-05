import pandas as pd

def immediate_food_delivery(delivery: pd.DataFrame) -> pd.DataFrame:
    delivery['immediate'] = delivery['order_date'] == delivery['customer_pref_delivery_date']
    idx_to_keep = delivery.groupby(by='customer_id')['order_date'].idxmin()
    return pd.DataFrame({'immediate_percentage': [round(100 * delivery['immediate'][idx_to_keep].mean(), 2)]})