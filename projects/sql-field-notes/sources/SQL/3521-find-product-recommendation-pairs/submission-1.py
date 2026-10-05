import pandas as pd

def find_product_recommendation_pairs(product_purchases: pd.DataFrame, product_info: pd.DataFrame) -> pd.DataFrame:
    df = product_purchases.merge(product_purchases, how='cross', suffixes=['_1', '_2'])
    df = df[(df.user_id_1 == df.user_id_2) & (df.product_id_1 < df.product_id_2)]
    df = df.rename(columns={
        'product_id_1': 'product1_id',
        'product_id_2': 'product2_id',
    })
    df = df[['product1_id', 'product2_id']]
    
    df = df.groupby(by=['product1_id', 'product2_id']).agg(
        customer_count = ('product1_id', 'size')
    ).reset_index()

    df = df[df.customer_count >= 3]

    df = df.merge(product_info, left_on='product1_id', right_on='product_id', how='left').rename(columns={
        'category': 'product1_category'})
    
    df = df.merge(product_info, left_on='product2_id', right_on='product_id', how='left').rename(columns={
        'category': 'product2_category'})

    df = df[['product1_id', 'product2_id', 'product1_category', 'product2_category', 'customer_count']]
    
    return df.sort_values(by=['customer_count', 'product1_id', 'product2_id'], ascending=[False, True, True])
    
