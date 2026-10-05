import pandas as pd

def fix_names(users: pd.DataFrame) -> pd.DataFrame:
    def fix_string(x):
        if len(x) > 1: return x[0].upper() + x[1:].lower()
        else: return x[0].upper()

    users['name'] = users['name'].transform(fix_string)
    
    return users.sort_values(by='user_id')