import pandas as pd

def find_employees(employee: pd.DataFrame) -> pd.DataFrame:
    df = employee.merge(employee, left_on='managerId', right_on='id', suffixes=['_x', '_y'])

    df = df[df.salary_x > df.salary_y]
    df = df.rename(columns={'name_x': 'Employee'})
    return df[['Employee']]