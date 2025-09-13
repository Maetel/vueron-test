import Q1 from '@/answers/Q1';
import Q2 from '@/answers/Q2';
import Q4Container from '@/answers/Q4Container';
import Q6Container from '@/answers/Q6Container';
import { Source, SOURCES } from '@/Sources';

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
    name: '3. Dashboard',
  },
  {
    name: '4. Three.js',
    component: <Q4Container></Q4Container>,
    source: SOURCES.find(s => s.name === 'Q4'),
  },
  {
    name: '5. Clustering',
  },
  {
    name: '6. Convex Hull',
    component: <Q6Container></Q6Container>,
    source: SOURCES.find(s => s.name === 'Q6'),
  },
  {
    name: '7. HTML Optimization',
  },
];
