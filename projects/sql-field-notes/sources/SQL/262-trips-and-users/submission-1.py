import pandas as pd

def trips_and_users(trips: pd.DataFrame, users: pd.DataFrame) -> pd.DataFrame:
    banned_ids = users.loc[users['banned'] == 'Yes', 'users_id']

    trips = trips[
        ~trips['client_id'].isin(banned_ids) &
        ~trips['driver_id'].isin(banned_ids)
    ]

    trips = trips[
        (trips['request_at'] >= '2013-10-01') &
        (trips['request_at'] <= '2013-10-03')
    ]

    def filter_status(x):
        return x.str.contains('cancelled').sum()

    df = trips.groupby('request_at').agg(
        validTotal=('client_id', 'size'),
        cancelTotal=('status', filter_status)
    ).reset_index()

    df['Cancellation Rate'] = (df['cancelTotal'] / df['validTotal']).round(2)
    df = df.rename(columns={'request_at': 'Day'})

    return df[['Day', 'Cancellation Rate']]