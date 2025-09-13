import Q1Source from '@/answers/Q1?raw';
import Q2Source from '@/answers/Q2?raw';
import Q4Source from '@/answers/Q4?raw';
import Q4ContainerSource from '@/answers/Q4Container?raw';
import Q6Source from '@/answers/Q6?raw';
import Q6ContainerSource from '@/answers/Q6Container?raw';
import SnakeSource from '@/answers/Snake?raw';
import SnakeViewerSource from '@/components/SnakeViewer?raw';

export interface Source {
  name: string;
  sources: { name: string; text: string }[];
}
export const SOURCES: Source[] = [
  {
    name: 'Q1',
    sources: [
      {
        name: '@/answers/Q1.tsx',
        text: Q1Source,
      },
      {
        name: '@/answers/Snake.ts',
        text: SnakeSource,
      },
      {
        name: '@/components/SnakeViewer.tsx',
        text: SnakeViewerSource,
      },
    ],
  },
  {
    name: 'Q2',
    sources: [
      {
        name: '@/answers/Q2.tsx',
        text: Q2Source,
      },
      {
        name: '@/answers/Snake.ts',
        text: SnakeSource,
      },
      {
        name: '@/components/SnakeViewer.tsx',
        text: SnakeViewerSource,
      },
    ],
  },
  {
    name: 'Q4',
    sources: [
      {
        name: '@/answers/Q4Container.tsx',
        text: Q4ContainerSource,
      },
      {
        name: '@/answers/Q4.tsx',
        text: Q4Source,
      },
    ],
  },
  {
    name: 'Q6',
    sources: [
      {
        name: '@/answers/Q6Container.tsx',
        text: Q6ContainerSource,
      },
      {
        name: '@/answers/Q6.ts',
        text: Q6Source,
      },
    ],
  },
];
