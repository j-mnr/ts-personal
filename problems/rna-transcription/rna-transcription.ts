type Nucleotide = 'A' | 'G' | 'C' | 'T';

export const TRANSCRIPTION_TABLE: { [key in Nucleotide]: string } = {
  A: 'U',
  G: 'C',
  C: 'G',
  T: 'A',
} as const;

const throwError = (): void => { throw new Error('Invalid input DNA.') };

export function toRna(dna: string): string {
  return [...dna].map(nuc => {
    return TRANSCRIPTION_TABLE[nuc as Nucleotide] || throwError();
  }).join("");
}
