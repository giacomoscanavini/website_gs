import pandas as pd

def analyze_dna_patterns(samples: pd.DataFrame) -> pd.DataFrame:
    samples['has_start'] = (samples.dna_sequence.str.startswith('ATG')).astype('int')
    samples['has_stop'] = (samples.dna_sequence.str.endswith('TAA') | 
                           samples.dna_sequence.str.endswith('TAG') | 
                           samples.dna_sequence.str.endswith('TGA')).astype('int')
    samples['has_atat'] = (samples.dna_sequence.str.contains('ATAT')).astype('int')
    samples['has_ggg'] = (samples.dna_sequence.str.contains('GGG')).astype('int')

    return samples