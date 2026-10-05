import pandas as pd

def second_highest_salary(employee: pd.DataFrame) -> pd.DataFrame:
    unique_salaries = employee['salary'].drop_duplicates()
    second_highest = unique_salaries.sort_values(ascending=False)
    if len(second_highest) > 1: 
        return pd.DataFrame({'SecondHighestSalary': [second_highest.values[1]]})
    else: 
        return pd.DataFrame({'SecondHighestSalary': [None]})