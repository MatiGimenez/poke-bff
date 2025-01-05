import { BaseModel } from '@common/model/base.model';

export interface Specie {
  color: BaseModel;
  evolution_chain: EvolutionChainUrl;
  flavor_text_entries: FlavorTextEntry[];
  generation: BaseModel;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: Name[];
  order: number;
}

interface EvolutionChainUrl {
  url: string;
}

interface FlavorTextEntry {
  flavor_text: string;
  language: BaseModel;
  version: BaseModel;
}

interface Name {
  language: BaseModel;
  name: string;
}
