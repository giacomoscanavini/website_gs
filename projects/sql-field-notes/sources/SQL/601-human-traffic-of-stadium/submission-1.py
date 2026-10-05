import pandas as pd

def human_traffic(stadium: pd.DataFrame) -> pd.DataFrame:
    df = stadium[stadium.people >= 100]
    df = df.reset_index(drop=True)
    df['groups'] = df['id'] - (df.index + 1)

    valid_groups = df.groupby(by='groups').agg(
        valid = ('groups', 'size')
    ).reset_index()
    valid_groups = valid_groups[valid_groups['valid'] >= 3]

    df = df.merge(valid_groups, on='groups', how='inner')
    return df[['id', 'visit_date', 'people']].sort_values(by='visit_date', ascending=True)