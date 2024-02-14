export interface Country {
  name: string;
  native: string;
  capital: string;
  emoji: string;
  currency: string;
  continent: { name: string };
  languages: { code: string; name: string }[];
}
