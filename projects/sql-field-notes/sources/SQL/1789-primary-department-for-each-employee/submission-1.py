import pandas as pd

def find_primary_department(employee: pd.DataFrame) -> pd.DataFrame:
    employee['nDepartments'] = employee.groupby('employee_id').department_id.transform('count')
    employee = employee.query("(primary_flag == 'Y') | (nDepartments == 1)")
    return employee[['employee_id', 'department_id']]
