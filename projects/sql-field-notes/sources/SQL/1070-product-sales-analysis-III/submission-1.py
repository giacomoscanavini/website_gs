import pandas as pd

def sales_analysis(sales: pd.DataFrame) -> pd.DataFrame:
    sales['year_order'] = sales.groupby(by='product_id')['year'].rank(method='min')
    sales = sales[sales['year_order'] == 1]
    sales = sales[['product_id', 'year', 'quantity', 'price']].rename(columns={'year': 'first_year'})
    return sales