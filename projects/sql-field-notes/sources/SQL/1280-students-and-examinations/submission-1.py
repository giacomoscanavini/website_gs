import pandas as pd

def students_and_examinations(students: pd.DataFrame, subjects: pd.DataFrame, examinations: pd.DataFrame) -> pd.DataFrame:
    df = students.merge(subjects, how='cross')

    exam_count = examinations.groupby(by=['student_id', 'subject_name']).agg(
        attended_exams = ('subject_name', 'count')
    ).reset_index()

    df = df.merge(exam_count, on=['student_id', 'subject_name'], how='left').fillna(0)
    return df.sort_values(['student_id', 'subject_name'])