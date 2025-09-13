interface Coord {
  i: number;
  j: number;
}

const DIRECTIONS = [
  { i: 1, j: 0 }, // 우
  { i: 0, j: 1 }, // 하
  { i: -1, j: 0 }, // 좌
  { i: 0, j: -1 }, // 상
];

const nextPos = (coord: Coord, direction: Coord): Coord => {
  return {
    i: coord.i + direction.i,
    j: coord.j + direction.j,
  };
};

// N^2의 배열에 순서대로 inputArray를 써서 리턴 - 문제 1,2에 동시 대응하기 위함
// 핵심 로직
// 1. 현재 위치에 값을 쓴다
// 2. 다음 위치가 막혔는지 확인한다
// 3. 막혔다면 방향을 바꾼다
// 4. 다음 위치로 이동한다
// 5. 1-4를 반복한다
export default function Snake(N: number, inputArray: number[]): number[] {
  if (N < 1 || N > 15) {
    throw new Error(`N이 범위를 벗어남. (1 < N < 15, 현재 N : ${N})`);
  }

  if (inputArray.length !== N * N) {
    throw new Error(
      `배열 길이가 N^2이어야 함 (현재 길이 : ${inputArray.length})`,
    );
  }

  // NaN으로 N^2만큼 초기화
  const retval: number[] = Array.from({ length: N * N }, () => NaN);

  // 결과배열의 값 확인. isBlocked 체크용
  const at = (coord: Coord) => {
    return retval[coord.j * N + coord.i];
  };

  // 결과배열에 쓰기
  const set = (coord: Coord, value: number) => {
    retval[coord.j * N + coord.i] = value;
  };

  let dirIndex = 0;

  // 기억할 방향 및 회전
  const direction = { ...DIRECTIONS[dirIndex] };
  function rotate() {
    dirIndex = (dirIndex + 1) % 4;
    const nextDirection = { ...DIRECTIONS[dirIndex] };
    direction.i = nextDirection.i;
    direction.j = nextDirection.j;
    return nextDirection;
  }

  const isBlocked = (coord: Coord): boolean => {
    if (coord.i >= N) {
      return true;
    }

    if (coord.j >= N) {
      return true;
    }

    return !isNaN(at(coord));
  };

  // 시작 좌표
  const coord = { i: 0, j: 0 };

  // 핵심 로직
  for (let index = 0; ; ++index) {
    // 현재 위치에 값을 쓴다
    set(coord, inputArray[index]);

    // 마지막 값이면 종료
    if (index === inputArray.length - 1) {
      break;
    }

    // 다음 값을 쓸 위치가 막혔으면 회전
    if (isBlocked(nextPos(coord, direction))) {
      rotate();
    }

    // 다음 위치로 이동
    const { i: nextI, j: nextJ } = nextPos(coord, direction);
    coord.i = nextI;
    coord.j = nextJ;
  }

  return retval;
}
