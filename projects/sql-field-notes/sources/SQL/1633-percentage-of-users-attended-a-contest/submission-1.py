import pandas as pd

def users_percentage(users: pd.DataFrame, register: pd.DataFrame) -> pd.DataFrame:
    nUsers = len(users.user_id)
    df = register.groupby(by='contest_id').agg(
        nUsersPerTest = ('user_id', 'size')
    ).reset_index()

    df['percentage'] = (100 * df['nUsersPerTest'] / nUsers).round(2)

    return df[['contest_id', 'percentage']].sort_values(by=['percentage', 'contest_id'], ascending=[False, True])