import pandas as pd

def sales_person(sales_person: pd.DataFrame, company: pd.DataFrame, orders: pd.DataFrame) -> pd.DataFrame:
    orders = orders.merge(company, on='com_id', how='left')
    orders = orders[orders.name.eq('RED')]
    idexlude = orders['sales_id'].unique()

    flag = ~sales_person['sales_id'].isin(idexlude)
    return sales_person[flag][['name']]
    