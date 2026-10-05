import pandas as pd

def find_managers(employee: pd.DataFrame) -> pd.DataFrame:
    reports = employee.groupby(by='managerId').agg(
        nReports = ('managerId', 'size')
    ).reset_index().rename(columns={'managerId': 'id'})

    df = employee.merge(reports, on='id', how='left')

    return df[df.nReports >= 5][['name']]