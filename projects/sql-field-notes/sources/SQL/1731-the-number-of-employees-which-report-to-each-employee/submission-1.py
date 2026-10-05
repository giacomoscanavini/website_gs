import pandas as pd

def count_employees(employees: pd.DataFrame) -> pd.DataFrame:
    by_manager = employees.groupby('reports_to', as_index=False).agg(
        reports_count=('employee_id', 'size'), 
        average_age=('age', 'mean')
    )
    by_manager['average_age'] = (by_manager['average_age'] + 1e-12).round(0)
    df = by_manager.merge(employees[['employee_id', 'name']], how='left', left_on='reports_to', right_on='employee_id')
    df.rename(columns={'employee_id_y': 'employee_id'}, inplace=True)
    return df[['employee_id', 'name', 'reports_count', 'average_age']]