import pandas as pd

def last_passenger(queue: pd.DataFrame) -> pd.DataFrame:
    queue.sort_values(by='turn', ascending=True, inplace=True)
    queue['cumsum_weight'] = queue['weight'].cumsum()
    return queue[queue.cumsum_weight <= 1000].tail(1)[['person_name']]
