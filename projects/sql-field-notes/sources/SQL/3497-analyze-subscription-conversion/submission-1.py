import pandas as pd

def analyze_subscription_conversion(user_activity: pd.DataFrame) -> pd.DataFrame:
    def custom_func(x):
        free_flag = x['activity_type'] == 'free_trial'
        paid_flag = x['activity_type'] == 'paid'

        round2 = lambda x: round(x + 0.0001, 2)

        return pd.Series({
            'trial_avg_duration': round2(x['activity_duration'][free_flag].mean()), 
            'paid_avg_duration': round2(x['activity_duration'][paid_flag].mean()), 
        })

    df = user_activity.groupby(by='user_id').apply(custom_func).reset_index()

    return df.dropna()