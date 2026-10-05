import pandas as pd

def count_followers(followers: pd.DataFrame) -> pd.DataFrame:
    df = followers.groupby('user_id').agg(
        followers_count = ('follower_id', 'nunique')
    ).reset_index()

    return df