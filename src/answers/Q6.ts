export interface Coord {
  x: number;
  y: number;
}

// (0,0) - (1,1) 사이의 랜덤한 점 N개 생성
export const generatePoints = (N: number = 100) => {
  const points: Coord[] = [];
  for (let i = 0; i < N; ++i) {
    const x = Math.random();
    const y = Math.random();
    points.push({ x, y });
  }
  return points;
};

function cross(p1: Coord, p2: Coord, p3: Coord): number {
  return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
}

// p1-p2를 잇는 직선이 있을 때 p3가 중심에서 멀어지는 방향에 있는지
// top-left 기준으로 p3는 p1-p2의 왼쪽에 위치와 동일한 의미
function isOutside(p1: Coord, p2: Coord, p3: Coord): boolean {
  // 외적으로 판단, 직선 상의 점 제외
  return cross(p1, p2, p3) > 0;
}

// p1-p2 직선에 대한 p3의 거리의 제곱, 최대거리만 찾을것이므로 최적화를 위해 sqrt 사용 X
function distSquared(p1: Coord, p2: Coord, p3: Coord): number {
  const A = p2.y - p1.y;
  const B = p1.x - p2.x;
  const C = p2.x * p1.y - p1.x * p2.y;

  return (A * p3.x + B * p3.y + C) ** 2 / (A * A + B * B);
}

// * 준비 : x좌표 기준 정렬, 가장 왼쪽/오른쪽 점 찾기 (최초 시작점을 찾기 위함)
// 핵심 로직 : divide and conquer
// 1. 두 점의 cross가 양수인 점들을 찾는다.
// 2. 그 중 가장 먼 점을 찾는다.
// 3. 그 점을 기준으로 다시 1~2를 반복한다.
// 4. 더이상 cross 양수인 점이 없으면 종료
// * 반대편도 동일하게 수행
// O(N log N) - 정렬 + 재귀탐색
export function calcConvexHull(inputPoints: Coord[]): {
  hull: Coord[];
  area: number;
  elapsed: number;
} {
  if (inputPoints.length < 3) {
    throw new Error('점의 갯수가 3 이상이어야 함');
  }

  const start = performance.now();

  const createCopy = () => {
    // const copiedPoints = structuredClone(points); // deep copy
    const retval: Coord[] = inputPoints.map((p, i) => ({ ...p, i })); // shallow
    return retval;
  };
  const xSorted = createCopy().sort((l, r) => l.x - r.x);

  // 시작 포인트
  const minXPoint = xSorted[0];
  const maxXPoint = xSorted[xSorted.length - 1];

  // 각 hull의 곡률이 변하는 곳 찾기 : 직선으로부터 거리가 최대인 점
  const getFarthest = (points: Coord[], start: Coord, end: Coord) => {
    let retval = start;
    let maxDist = -1;
    points.forEach(p => {
      const dist = distSquared(start, end, p);
      if (dist > maxDist) {
        maxDist = dist;
        retval = p;
      }
    });
    return retval;
  };

  const hull: Set<Coord> = new Set();

  const recursivelyFindConvex = (points: Coord[], start: Coord, end: Coord) => {
    // 포인트 순서때문에 start부터 추가
    hull.add(start);

    const keep: Coord[] = [];
    points.forEach(p => {
      if (isOutside(start, end, p) && p !== start) {
        keep.push(p);
      }
    });
    const farthest = getFarthest(keep, start, end);

    const left = keep.filter(
      p => p !== farthest && isOutside(start, farthest, p),
    );
    const right = keep.filter(
      p => p !== farthest && isOutside(farthest, end, p),
    );

    const hasLeft = left.length > 0;
    const hasRight = right.length > 0;
    if (hasLeft) {
      recursivelyFindConvex(left, start, farthest);
    }

    if (hasRight) {
      recursivelyFindConvex(right, farthest, end);
    }

    // 앞 과정이 다 끝나면 가장 먼 점 추가
    // end는 다음 재귀에서 start로 추가됨
    hull.add(farthest);
  };

  recursivelyFindConvex(xSorted, minXPoint, maxXPoint); // minX -> maxX 보다 위의 점들
  recursivelyFindConvex(xSorted, maxXPoint, minXPoint); // maxX -> minX 보다 아래의 점들

  const hullArray = Array.from(hull);

  // 면적 계산
  const calcArea = (hull: Coord[]): number => {
    let area = 0;
    for (let i = 0; i < hull.length; ++i) {
      const p1 = hull[i];
      const p2 = hull[(i + 1) % hull.length];
      area += p1.x * p2.y - p2.x * p1.y;
    }
    return Math.abs(area / 2);
  };

  const area = calcArea(hullArray);

  const elapsed = performance.now() - start;
  return {
    hull: Array.from(hull),
    area,
    elapsed,
  };
}
