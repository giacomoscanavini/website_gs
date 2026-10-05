import pandas as pd

def find_employees(employees: pd.DataFrame) -> pd.DataFrame:
    flag_lowSalary = employees.salary < 30000
    flag_hasManager = ~employees.manager_id.isna()
    flag_managerLeft = ~employees['manager_id'].isin(employees['employee_id'])
    flag_ = flag_lowSalary & flag_hasManager & flag_managerLeft

    return employees[flag_][['employee_id']].sort_values(by='employee_id', ascending=True)