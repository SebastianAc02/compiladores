import React, { useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface State {
  name: string;
  isInitial: boolean;
  isFinal: boolean;
}

interface EquivalentStatesProps {
  states: State[];
  alphabet: string[];
  transitions: Record<string, Record<string, string>>;
}

interface DFA {
  states: string[];
  alphabet: string[];
  transitions: Record<string, Record<string, string>>;
  initialState: string;
  finalStates: string[];
}

const createDFA = (
  states: State[], 
  alphabet: string[], 
  transitions: Record<string, Record<string, string>>
): DFA => {
  const stateNames = states.map(s => s.name);
  const initialState = states.find(s => s.isInitial)?.name || stateNames[0];
  const finalStates = states.filter(s => s.isFinal).map(s => s.name);
  
  return {
    states: stateNames,
    alphabet,
    transitions,
    initialState,
    finalStates
  };
};

const minimizeDFA = (dfa: DFA): string[][] => {
  // Partición inicial: estados finales y no finales
  let partition = [
    dfa.states.filter(s => dfa.finalStates.includes(s)),
    dfa.states.filter(s => !dfa.finalStates.includes(s))
  ].filter(set => set.length > 0);

  // Función para realizar una iteración de refinamiento
  const refinePartition = (currentPartition: string[][]): string[][] => {
    const newPartition: string[][] = [];
    
    for (const set of currentPartition) {
      if (set.length <= 1) {
        newPartition.push(set);
        continue;
      }
      
      const subsets: Record<string, string[]> = {};
      for (const state of set) {
        const key = dfa.alphabet.map(symbol => {
          const nextState = dfa.transitions[state][symbol];
          return currentPartition.findIndex(s => s.includes(nextState));
        }).join(',');
        
        if (!subsets[key]) {
          subsets[key] = [];
        }
        subsets[key].push(state);
      }
      
      newPartition.push(...Object.values(subsets));
    }
    
    return newPartition;
  };

  // Realizar exactamente dos iteraciones
  for (let i = 0; i < 2; i++) {
    partition = refinePartition(partition);
  }

  return partition.filter(set => set.length > 1);
};

const cleanOutput = (partition: string[][]): [string, string][] => {
  const generatePairs = (set: string[]): [string, string][] => {
    const pairs: [string, string][] = [];
    for (let i = 0; i < set.length; i++) {
      for (let j = i + 1; j < set.length; j++) {
        pairs.push([set[i], set[j]]);
      }
    }
    return pairs;
  };

  const allPairs = partition.flatMap(generatePairs);
  const sortedPairs = allPairs.map(pair => pair.sort((a, b) => a.localeCompare(b)) as [string, string]);
  return sortedPairs.sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0].localeCompare(b[0]);
    }
    return a[1].localeCompare(b[1]);
  });
};

const EquivalentStates: React.FC<EquivalentStatesProps> = ({ states, alphabet, transitions }) => {
    console.log({states,alphabet, transitions})
  const equivalentStates = useMemo(() => {
    const dfa = createDFA(states, alphabet, transitions);
    const minimizedPartition = minimizeDFA(dfa);
    return cleanOutput(minimizedPartition);
  }, [states, alphabet, transitions]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Estados Equivalentes</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Estado 1</TableHead>
            <TableHead className="text-center">Estado 2</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equivalentStates.map(([state1, state2], index) => (
            <TableRow key={index}>
              <TableCell className="text-center">{state1}</TableCell>
              <TableCell className="text-center">{state2}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EquivalentStates;