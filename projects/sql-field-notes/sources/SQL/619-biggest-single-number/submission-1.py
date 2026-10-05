import pandas as pd

def biggest_single_number(my_numbers: pd.DataFrame) -> pd.DataFrame:
    df = my_numbers.groupby(by='num').agg(
        freq = ('num', 'size')
    ).reset_index()

    return pd.DataFrame({'num': df[df.freq == 1][['num']].max()})