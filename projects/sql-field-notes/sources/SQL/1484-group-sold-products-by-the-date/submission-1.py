import pandas as pd

def categorize_products(activities: pd.DataFrame) -> pd.DataFrame:
    activities.drop_duplicates(keep='first', inplace=True)
    
    def concat_string(x):
        x.sort_values(ascending=True, inplace=True)
        return ','.join(x)
    
    df = activities.groupby(by='sell_date').agg(
        num_sold = ('product', 'size'),
        products = ('product', concat_string)
    ).reset_index()

    return df