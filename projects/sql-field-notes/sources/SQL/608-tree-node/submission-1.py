import pandas as pd

def tree_node(tree: pd.DataFrame) -> pd.DataFrame:
    parents = tree['p_id'].dropna().unique()

    def classify(x):
        if pd.isna(x['p_id']): return 'Root'
        elif x['id'] in parents: return 'Inner'
        else: return 'Leaf'
 
    tree['type'] = tree.apply(classify, axis=1)

    return tree[['id', 'type']]