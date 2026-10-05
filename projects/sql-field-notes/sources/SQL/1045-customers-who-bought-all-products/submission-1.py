import pandas as pd

def find_customers(customer: pd.DataFrame, product: pd.DataFrame) -> pd.DataFrame:
    nProducts = product['product_key'].nunique()

    df = customer.groupby(by='customer_id').agg(
        nSold = ('product_key', 'nunique')
    ).reset_index()

    return df[df.nSold == nProducts][['customer_id']]