import pandas as pd

def movie_rating(movies: pd.DataFrame, users: pd.DataFrame, movie_rating: pd.DataFrame) -> pd.DataFrame:
    df_users = movie_rating.groupby(by='user_id').agg(
        nReviews = ('rating', 'size')
    ).reset_index()
    df_users = df_users.merge(users, on='user_id', how='left').sort_values(by=['nReviews', 'name'], ascending=[False, True])[['name', 'nReviews']]

    df_movies = movie_rating[(movie_rating.created_at >= '2020-02-01') & (movie_rating.created_at < '2020-03-01')]
    df_movies = df_movies.groupby(by='movie_id').agg(
        avgRating = ('rating', 'mean')
    )
    df_movies = df_movies.merge(movies, on='movie_id', how='left').sort_values(by=['avgRating', 'title'], ascending=[False, True])[['title', 'avgRating']]

    return pd.concat([df_users.iloc[[0]][['name']].rename(columns={'name': 'results'}),
                      df_movies.iloc[[0]][['title']].rename(columns={'title': 'results'}),
                    ])