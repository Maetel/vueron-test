import { cn } from '@/utils';

// 색을 입혀서 값을 보기 쉽게 하기 위함
export default function SnakeViewer({
  name,
  N,
  array,
}: {
  name: string;
  N: number;
  array: number[];
}) {
  const maxValue = array.reduce((prev, val) => (val > prev ? val : prev), -1);

  return (
    <article>
      N: {N}
      <ul
        className={cn(
          'inline-grid list-none px-5',
          'grid-cols-[repeat(var(--snake-n),minmax(0,1fr))]',
          'grid-rows-[repeat(var(--snake-n),minmax(0,1fr))]',
        )}
        style={{ ['--snake-n' as any]: N }}
      >
        {array.map((value: number, index: number) => {
          const i = Math.floor(index / N);
          const j = index % N;
          const color = 1 - value / maxValue;
          return (
            <li
              key={`snake-${name}-${N}-${i}-${j}`}
              className={cn(
                'px-2 flex items-center justify-center border-1 text-white',
                value === 0 ? 'text-black' : 'bg-[var(--bgColor)]',
              )}
              style={{
                ['--bgColor' as any]: `color(srgb ${color} 0.2 0.2  / 1.0)`,
              }}
            >
              {value}
            </li>
          );
        })}
      </ul>
    </article>
  );
}
