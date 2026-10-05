import pandas as pd

def price_at_given_date(products: pd.DataFrame) -> pd.DataFrame:
    ids = set(products.product_id)

    df = products[products['change_date'] <= '2019-08-16']
    df = df.sort_values(by=['product_id', 'change_date'], ascending=[True, False]).drop_duplicates('product_id').rename(columns={'new_price': 'price'})
    
    updated_ids = set(df.product_id)
    to_update = list(ids.difference(updated_ids))
    df1 = pd.DataFrame({'product_id': to_update, 
                        'price': [10 for x in to_update]})

    return pd.concat([df[['product_id', 'price']], df1])