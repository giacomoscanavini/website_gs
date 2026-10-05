import pandas as pd

def user_activity(activity: pd.DataFrame) -> pd.DataFrame:
    good_activity = ['open_session', 'end_session', 'scroll_down', 'send_message']
    bool_activity_type = activity['activity_type'].isin(good_activity)

    activity['activity_date'] = pd.to_datetime(activity['activity_date'])
    end_date = pd.Timestamp('2019-07-27')
    start_date = end_date - pd.Timedelta(days=29)
    bool_activity_date = activity['activity_date'].between(start_date, end_date)

    bool_flag = bool_activity_type & bool_activity_date
    df = activity[bool_flag]

    return df.groupby(by='activity_date').agg(
        active_users = ('user_id', 'nunique')
    ).reset_index().rename(columns={'activity_date': 'day'})