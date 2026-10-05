import pandas as pd

def project_employees_i(project: pd.DataFrame, employee: pd.DataFrame) -> pd.DataFrame:
    df = project.merge(employee, on='employee_id', how='left')[['project_id', 'experience_years']]
    df = df.groupby(by='project_id').agg(
        total_years = ('experience_years', 'sum'),
        n_employees = ('experience_years', 'size'),
    ).reset_index()

    df['average_years'] = (df['total_years'] / df['n_employees']).round(2)

    return df[['project_id', 'average_years']]
    