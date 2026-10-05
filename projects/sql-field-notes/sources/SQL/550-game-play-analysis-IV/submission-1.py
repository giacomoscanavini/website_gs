import pandas as pd

def gameplay_analysis(activity: pd.DataFrame) -> pd.DataFrame:
    activity['first_login'] = activity.groupby(by='player_id')['event_date'].transform('min')
    activity['valid'] = activity['event_date'] == activity['first_login'] + pd.Timedelta(days = 1)
    
    return pd.DataFrame({
        'fraction': [round(activity.groupby(by='player_id')['valid'].any().mean(), 2)]
    })