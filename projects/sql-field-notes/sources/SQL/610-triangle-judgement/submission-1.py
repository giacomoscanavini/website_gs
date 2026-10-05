import pandas as pd

def triangle_judgement(triangle: pd.DataFrame) -> pd.DataFrame:
    def triangle_check(x):
        if x['x'] + x['y'] <= x['z']: return 'No'
        elif x['y'] + x['z'] <= x['x']: return 'No'
        elif x['x'] + x['z'] <= x['y']: return 'No'
        else: return 'Yes'

    triangle['triangle'] = triangle.apply(triangle_check, axis=1)
    return triangle