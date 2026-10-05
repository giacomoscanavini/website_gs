import pandas as pd

def get_average_time(activity: pd.DataFrame) -> pd.DataFrame:
    df_s = activity[activity.activity_type == 'start']
    df_e = activity[activity.activity_type == 'end']
    df = df_s.merge(df_e, on=['machine_id', 'process_id'], how='left', suffixes=('_s', '_e'))
    df['processing_time'] = df['timestamp_e'] - df['timestamp_s']
    df = df.drop(columns=['process_id', 'activity_type_s', 'activity_type_e', 'timestamp_s', 'timestamp_e'])

    return df.groupby(by='machine_id').mean().round(3).reset_index()