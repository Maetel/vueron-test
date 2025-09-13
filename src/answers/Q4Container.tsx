import Q4 from '@/answers/Q4';
import { useState } from 'react';

export default function Q4Container() {
  const colorPreset = [0xff0000, 0x00ff00, 0x0000ff, 0xaaaaaa, 0x000000];
  const [frequency, setFrequency] = useState(5);
  const enableOrbitControls = !false;
  const [direction, setDirection] = useState<'clockwise' | 'counterclockwise'>(
    'counterclockwise',
  );

  return (
    <section className="w-full h-full">
      <div className="absolute right-1 top-1 flex flex-col gap-2">
        <div className="flex items-center">
          분당 회전 수 :{' '}
          <input
            className="border border-gray-300 rounded-md px-1 w-16"
            type="number"
            value={frequency}
            min={0}
            max={1000}
            onChange={e => {
              setFrequency(Math.abs(Number(e.target.value)));
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          방향
          <select
            className="ml-2 border border-gray-300 rounded-md px-1 py-0.5"
            value={direction}
            onChange={e => {
              setDirection(e.target.value as 'clockwise' | 'counterclockwise');
            }}
          >
            <option value="clockwise">시계방향</option>
            <option value="counterclockwise">반시계방향</option>
          </select>
        </div>
      </div>

      <Q4
        colorPreset={colorPreset}
        frequency={isNaN(frequency) ? 0 : frequency}
        enableOrbitControls={enableOrbitControls}
        direction={direction}
      ></Q4>
    </section>
  );
}
