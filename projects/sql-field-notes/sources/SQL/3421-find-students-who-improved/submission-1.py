import pandas as pd

def find_students_who_improved(scores: pd.DataFrame) -> pd.DataFrame:
    def custom_func(x):
        first_date = x['exam_date'].argmin()
        last_date = x['exam_date'].argmax()

        latest_score = x['score'].iloc[last_date]
        first_score = x['score'].iloc[first_date]

        return pd.Series({
            'improved': latest_score > first_score,
            'first_score': first_score,
            'latest_score': latest_score,
        })

    df = scores.groupby(by=['student_id', 'subject']).apply(custom_func).reset_index()

    return df[df.improved == True][['student_id', 'subject', 'first_score', 'latest_score']]


'''
def find_students_who_improved(scores: pd.DataFrame) -> pd.DataFrame:
    df = scores.sort_values(['student_id','subject','exam_date'])
    df = df.groupby(['student_id','subject'])['score'].agg(first_score='first',latest_score='last').reset_index()
    return df[df.first_score < df.latest_score]
'''