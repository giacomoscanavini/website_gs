import pandas as pd

def list_products(products: pd.DataFrame, orders: pd.DataFrame) -> pd.DataFrame:
    orders = orders[(orders.order_date > '2020-01-31') & (orders.order_date < '2020-03-01')]

    df = orders.groupby(by='product_id').agg(
        unit = ('unit', 'sum')
    ).reset_index()

    df = df[df.unit >= 100]
    df = df.merge(products, on='product_id', how='left')

    return df[['product_name', 'unit']]
