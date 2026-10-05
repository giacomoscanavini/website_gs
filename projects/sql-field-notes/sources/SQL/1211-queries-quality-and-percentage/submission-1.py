import pandas as pd

def queries_stats(queries: pd.DataFrame) -> pd.DataFrame:
    queries['quality_ratio'] = queries['rating'] / queries['position']
    queries['poor'] = queries['rating'].apply(
        lambda x: 1 if x < 3 else 0
    )

    df = queries.groupby(by='query_name').agg(
        quality = ('quality_ratio', 'mean'),
        poor_query_percentage = ('poor', 'mean')
    ).reset_index()

    df['quality'] = df['quality'].round(2)
    df['poor_query_percentage'] = (100 * df['poor_query_percentage']).round(2)

    return df[['query_name', 'quality', 'poor_query_percentage']]
