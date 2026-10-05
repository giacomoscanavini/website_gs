import pandas as pd

def replace_employee_id(employees: pd.DataFrame, employee_uni: pd.DataFrame) -> pd.DataFrame:
    df = employee_uni.merge(employees, on='id', how='right')
    return df[['unique_id','name']]