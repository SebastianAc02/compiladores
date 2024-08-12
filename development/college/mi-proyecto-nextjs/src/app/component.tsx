'use client'
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { X, Plus } from 'lucide-react';
import EquivalentStates from './equivalentstates';

interface State {
  name: string;
  isInitial: boolean;
  isFinal: boolean;
}

const exampleInputs = [
  {
    name: "Example 1",
    input: `6
a b
1 2 5
0 1 2
1 3 4
2 4 3
3 5 5 
4 5 5
5 5 5`
  },
  {
    name: "Example 2",
    input: `6
a b
3 4 5
0 1 2
1 3 4
2 4 3
3 5 5 
4 5 5
5 5 5`
  },
  {
    name: "Example 3",
    input: `6
a
1 4
0 1
1 2
2 3
3 4
4 5
5 0`
  },
  {
    name: "Example 4",
    input: `4
a b
0 1
0 1 2
1 1 2
2 3 1
3 3 3`
  }
];

const DFACrossTable = () => {
  const [states, setStates] = useState<State[]>([]);
  const [alphabet, setAlphabet] = useState<string[]>([]);
  const [transitions, setTransitions] = useState<{[key: string]: {[key: string]: string}}>({});
  const [newSymbol, setNewSymbol] = useState('');
  const [dfaInput, setDfaInput] = useState('');
  const [showEquivalentStates, setShowEquivalentStates] = useState(false);

  const processDfaInput = () => {
    const lines = dfaInput.split('\n').map(line => line.trim()).filter(line => line);
    if (lines.length < 3) return;
  
    const numStates = parseInt(lines[0]);
    const alphabet = lines[1].split(' ');
    let finalStates: number[] = [];
    let transitionStartIndex: number;
  
    if (lines[2].split(' ').every(item => !isNaN(parseInt(item)))) {
      finalStates = lines[2].split(' ').map(Number);
      transitionStartIndex = 3;
    } else {
      transitionStartIndex = 2;
    }
  
    const newStates = Array.from({ length: numStates }, (_, i) => ({
      name: `q${i}`,
      isInitial: i === 0,
      isFinal: finalStates.includes(i)
    }));
  
    const newTransitions: {[key: string]: {[key: string]: string}} = {};
  
    for (let i = transitionStartIndex; i < lines.length; i++) {
      const parts = lines[i].split(' ').map(Number);
      const fromState = `q${parts[0]}`;
  
      if (!newTransitions[fromState]) {
        newTransitions[fromState] = {};
      }
  
      if (parts.length === alphabet.length + 1) {
        for (let j = 0; j < alphabet.length; j++) {
          newTransitions[fromState][alphabet[j]] = `q${parts[j + 1]}`;
        }
      } else if (parts.length === 2) {
        newTransitions[fromState][alphabet[0]] = `q${parts[1]}`;
      }
    }
  
    setStates(newStates);
    setAlphabet(alphabet);
    setTransitions(newTransitions);
    setShowEquivalentStates(true);
  };

  const addNewState = () => {
    const stateName = `q${states.length}`;
    if (!states.some(state => state.name === stateName)) {
      setStates([...states, { name: stateName, isInitial: false, isFinal: false }]);
    }
  };

  const addNewSymbol = () => {
    if (newSymbol && !alphabet.includes(newSymbol)) {
      setAlphabet([...alphabet, newSymbol]);
      setNewSymbol('');
    }
  };

  const removeState = (stateName: string) => {
    setStates(states.filter(state => state.name !== stateName));
    const newTransitions = { ...transitions };
    delete newTransitions[stateName];
    Object.keys(newTransitions).forEach(fromState => {
      Object.keys(newTransitions[fromState]).forEach(symbol => {
        if (newTransitions[fromState][symbol] === stateName) {
          delete newTransitions[fromState][symbol];
        }
      });
    });
    setTransitions(newTransitions);
  };

  const removeSymbol = (symbol: string) => {
    setAlphabet(alphabet.filter(s => s !== symbol));
    const newTransitions = { ...transitions };
    for (let state in newTransitions) {
      delete newTransitions[state][symbol];
    }
    setTransitions(newTransitions);
  };

  const toggleInitial = (stateName: string) => {
    setStates(states.map(state => 
      state.name === stateName ? { ...state, isInitial: !state.isInitial } : state
    ));
  };

  const toggleFinal = (stateName: string) => {
    setStates(states.map(state => 
      state.name === stateName ? { ...state, isFinal: !state.isFinal } : state
    ));
  };

  const handleTransitionChange = (fromState: string, symbol: string, toState: string) => {
    setTransitions(prev => ({
      ...prev,
      [fromState]: {
        ...prev[fromState],
        [symbol]: toState
      }
    }));
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">DFA Cross Table</h1>

      <div className="w-full max-w-4xl mb-4 flex justify-center space-x-2">
        {exampleInputs.map((example, index) => (
          <Button 
            key={index} 
            variant="outline" 
            onClick={() => setDfaInput(example.input)}
          >
            {example.name}
          </Button>
        ))}
      </div>

      <div className="w-full max-w-4xl mb-6 h-full resize-none overflow-hidden min-h-[20rem]">
        <Textarea
          placeholder="Enter DFA description here..."
          value={dfaInput}
          onChange={(e) => setDfaInput(e.target.value)}
          className="w-full h-40"
        />
        <Button onClick={processDfaInput} className="mt-2">
          Process DFA
        </Button>
      </div>

      <div className="overflow-x-auto w-full max-w-4xl shadow-lg rounded-lg">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-32 text-center font-bold">State</TableHead>
              {alphabet.map((symbol) => (
                <TableHead key={symbol} className="w-24 text-center relative group">
                  <span className="font-bold">{symbol}</span>
                  <button
                    onClick={() => removeSymbol(symbol)}
                    className="absolute top-0 right-0 mt-1 mr-1 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </TableHead>
              ))}
              <TableHead className="w-24">
                <Input 
                  placeholder="+" 
                  value={newSymbol}
                  onChange={(e) => setNewSymbol(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addNewSymbol();
                    }
                  }}
                  className="w-full text-center"
                />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {states.map((state) => (
              <TableRow key={state.name} className="hover:bg-gray-50">
                <TableCell className="font-medium text-center relative">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-pointer inline-block px-2 py-1 rounded hover:bg-gray-200">
                          {state.name}
                          {state.isInitial ? ' (I)' : ''}
                          {state.isFinal ? ' (F)' : ''}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <div className="flex flex-col space-y-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => toggleInitial(state.name)}
                          >
                            {state.isInitial ? 'Remove Initial' : 'Make Initial'}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => toggleFinal(state.name)}
                          >
                            {state.isFinal ? 'Remove Final' : 'Make Final'}
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => removeState(state.name)}
                          >
                            Delete State
                          </Button>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                {alphabet.map((symbol) => (
                  <TableCell key={`${state.name}-${symbol}`} className="p-0">
                    <Input 
                      value={transitions[state.name]?.[symbol] || ''}
                      onChange={(e) => handleTransitionChange(state.name, symbol, e.target.value)}
                      className="w-full h-full border-0 focus:ring-1 focus:ring-blue-300 text-center"
                      style={{ textAlign: 'center' }}
                      list={`autocomplete-${state.name}-${symbol}`}
                    />
                    <datalist id={`autocomplete-${state.name}-${symbol}`}>
                      {states.map(s => (
                        <option key={s.name} value={s.name} />
                      ))}
                    </datalist>
                  </TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={alphabet.length + 2} className="text-center">
                <Button variant="ghost" onClick={addNewState} className="w-full">
                  <Plus size={16} className="mr-2" /> Add State
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {showEquivalentStates && (
        <div className="w-full max-w-4xl">
          <EquivalentStates states={states} alphabet={alphabet} transitions={transitions} />
        </div>
      )}
    </div>
  );
};

export default DFACrossTable;