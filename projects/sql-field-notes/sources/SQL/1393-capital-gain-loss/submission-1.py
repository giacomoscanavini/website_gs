import pandas as pd

def capital_gainloss(stocks: pd.DataFrame) -> pd.DataFrame:
    flag = stocks['operation'] == 'Buy'
    stocks['price'][flag] = -1 * stocks['price']

    return stocks.groupby(by='stock_name').agg(
        capital_gain_loss = ('price', 'sum')
    ).reset_index()
    