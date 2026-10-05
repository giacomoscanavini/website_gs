import pandas as pd

def find_investments(insurance: pd.DataFrame) -> pd.DataFrame:
    flag_nonunique_tiv = insurance['tiv_2015'].duplicated(keep=False)
    flag_unique_city = ~insurance[['lat', 'lon']].duplicated(keep=False)
    
    df = insurance[flag_nonunique_tiv & flag_unique_city]
    return df[['tiv_2016']].sum().to_frame('tiv_2016').round(2)