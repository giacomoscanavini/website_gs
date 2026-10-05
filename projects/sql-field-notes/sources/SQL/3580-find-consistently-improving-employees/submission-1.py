import pandas as pd

def find_consistently_improving_employees(employees: pd.DataFrame, performance_reviews: pd.DataFrame) -> pd.DataFrame:
    df = (
        performance_reviews
        .sort_values(by=['employee_id', 'review_date'], ascending=[True, False])
        .groupby(by='employee_id')
        .head(3)
    )[['employee_id', 'rating']]

    df['nRating'] = df.groupby(by='employee_id').rating.transform('size')
    df = df[df.nRating >= 3]

    df['rating2'] = df['rating'].shift(-1)
    df['rating3'] = df['rating2'].shift(-1)
    df = df.groupby(by='employee_id').first().reset_index()
    df = df[(df.rating > df.rating2) & (df.rating2 > df.rating3)]
    df['improvement_score'] = df['rating'] - df['rating3']

    df = df.merge(employees, on='employee_id', how='left')
    
    return df.sort_values(by=['improvement_score', 'name'], ascending=[False, True])[['employee_id', 'name', 'improvement_score']]

    