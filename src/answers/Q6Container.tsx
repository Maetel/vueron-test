import { calcConvexHull, Coord, generatePoints } from '@/answers/Q6';
import Button from '@/components/Button';
import InitialPoints from '@/Points';
import { formatDecimal } from '@/utils';
import { useEffect, useState } from 'react';

function Q6() {
  const [points, setPoints] = useState<Coord[]>(InitialPoints);
  const [pointCount, setPointCount] = useState(InitialPoints.length);

  const [answer, setAnswer] = useState<{
    hull: Coord[];
    area: number;
    elapsed: number;
  }>(calcConvexHull(points));
  const [hoveredCoord, setHoveredCoord] = useState<Coord | null>(null);

  const [showOutline, setShowOutline] = useState(true);

  useEffect(() => {
    if (points === InitialPoints) {
      return;
    }
    setAnswer(calcConvexHull(points));
  }, [points]);

  const { hull, area, elapsed } = answer;

  return (
    <div className="relative w-full h-full box-border">
      <section className="mt-5 h-[60%] p-5 relative aspect-square m-auto">
        <svg
          viewBox="-0.05 -0.05 1.1 1.1"
          className="w-full h-full border border-gray-300 bg-white"
        >
          {showOutline && (
            <>
              {/* 외곽선 */}
              <polyline
                points={
                  hull.map(p => `${p.x},${1 - p.y}`).join(' ') +
                  ` ${hull[0].x},${1 - hull[0].y}`
                }
                fill="rgba(0,0,255,0.3)"
                stroke="blue"
                strokeWidth={0.002}
              ></polyline>
            </>
          )}

          {/* 모든 점들 */}
          {points.map((p, i) => (
            <circle
              onMouseEnter={() => {
                setHoveredCoord(p);
              }}
              key={`point-${i}`}
              cx={p.x}
              cy={1 - p.y} // 좌표계 일치시켜주기
              r={0.008}
              fill="black"
            />
          ))}

          {showOutline && (
            <>
              {/* hull만 다시그리기 */}
              {hull.map((p, i) => (
                <circle
                  onMouseEnter={() => {
                    setHoveredCoord(p);
                  }}
                  key={`hull-point-${i}`}
                  cx={p.x}
                  cy={1 - p.y} // 좌표계 일치시켜주기
                  r={0.01}
                  fill="red"
                />
              ))}
            </>
          )}
        </svg>
        <div className="absolute right-0 top-0 flex gap-2">
          <div className="bg-white p-1 rounded-md border border-gray-300">
            외곽
            <input
              type="checkbox"
              checked={showOutline}
              onChange={e => {
                setShowOutline(e.target.checked);
              }}
            ></input>
          </div>
          <div className="bg-white p-1 rounded-md border border-gray-300">
            점 갯수 :
            <input
              type="number"
              className="w-16 border border-gray-300 rounded-md text-right"
              value={pointCount}
              onChange={e => {
                let v = parseInt(e.target.value);
                if (isNaN(v) || v < 3) {
                  v = 3;
                } else if (v > 1000) {
                  v = 1000;
                }
                setPointCount(v);
                setPoints(generatePoints(v));
              }}
            ></input>
          </div>
          <Button
            onClick={() => {
              setPoints(generatePoints(pointCount));
            }}
          >
            점 생성
          </Button>
        </div>
        <div className="absolute left-0 top-0 bg-white p-1 rounded-md border border-gray-300">
          좌표 : ({formatDecimal(hoveredCoord?.x ?? '-', 4)},
          {formatDecimal(hoveredCoord?.y ?? '-', 4)})
        </div>
      </section>
      <article className="p-5 mb-20">
        <div>면적 : {area}</div>
        <div>소요시간 : {formatDecimal(elapsed)}ms</div>
        <div>외곽 포인트 :</div>
        <ol>
          {hull.map((point, i) => (
            <li
              className="ml-3"
              key={`hull-${i}`}
            >{`[${i + 1}] (${formatDecimal(point.x, 4)}, ${formatDecimal(point.y, 4)})`}</li>
          ))}
        </ol>
      </article>
    </div>
  );
}

export default Q6;
