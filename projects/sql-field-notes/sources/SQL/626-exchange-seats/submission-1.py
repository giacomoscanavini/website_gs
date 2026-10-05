import pandas as pd

def exchange_seats(seat: pd.DataFrame) -> pd.DataFrame:
    last_id = seat.id.max()

    def swap_ids(x):
        if x % 2 == 0: return x - 1
        else:
            if x == last_id: return x
            else: return x + 1

    seat['id'] = seat['id'].transform(swap_ids)
    return seat.sort_values(by='id', ascending=True)