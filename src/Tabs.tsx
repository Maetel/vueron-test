import Q1 from '@/answers/Q1';
import Q2 from '@/answers/Q2';
import Q4Container from '@/answers/Q4Container';
import Q6Container from '@/answers/Q6Container';
import { Source, SOURCES } from '@/Sources';
import Q3Container from './answers/Q3Container';

export interface Tab {
  name: string;
  component?: React.ReactNode;
  source?: Source;
}
export const TABS: Tab[] = [
  {
    name: '1. NxN',
    component: <Q1></Q1>,
    source: SOURCES.find(s => s.name === 'Q1'),
  },
  {
    name: '2. NxN (2)',
    component: <Q2></Q2>,
    source: SOURCES.find(s => s.name === 'Q2'),
  },
  {
    name: '3. Architecture',
    component: <Q3Container></Q3Container>,
  },
  {
    name: '4. Three.js',
    component: <Q4Container></Q4Container>,
    source: SOURCES.find(s => s.name === 'Q4'),
  },
  {
    name: '6. Convex Hull',
    component: <Q6Container></Q6Container>,
    source: SOURCES.find(s => s.name === 'Q6'),
  },
];
