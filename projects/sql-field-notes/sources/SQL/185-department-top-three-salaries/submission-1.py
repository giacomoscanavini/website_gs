import pandas as pd

def top_three_salaries(employee: pd.DataFrame, department: pd.DataFrame) -> pd.DataFrame:
    employee['ranked'] = employee.groupby(by='departmentId')['salary'].rank(method='dense', ascending=False)
    employee = employee[employee.ranked <= 3]
    df = employee.merge(department, left_on='departmentId', right_on='id', suffixes=['_x', '_y'])
    df = df.rename(columns={
        'name_x': 'Employee',
        'name_y': 'Department',
        'salary': 'Salary',
    })
    return df[['Department', 'Employee', 'Salary']]