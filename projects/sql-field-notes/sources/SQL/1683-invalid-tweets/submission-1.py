import pandas as pd

def invalid_tweets(tweets: pd.DataFrame) -> pd.DataFrame:
    tweets['valid'] = tweets['content'].str.len() <= 15
    """
    Alternative using APPLY method
    def is_valid(x):
        if len(x) > 15: return False
        else: return True

    tweets['valid'] = tweets['content'].apply(is_valid)
    """
    df = tweets[tweets.valid == False]
    return df[['tweet_id']]