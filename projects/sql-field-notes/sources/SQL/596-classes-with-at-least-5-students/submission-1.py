import pandas as pd

def find_classes(courses: pd.DataFrame) -> pd.DataFrame:
    df = courses.groupby(by='class').agg(
        nStudents = ('student', 'nunique')
    ).reset_index()

    return df[df.nStudents >= 5][['class']]