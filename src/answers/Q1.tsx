import Snake from '@/answers/Snake';
import SnakeViewer from '@/components/SnakeViewer';

export default function Q1() {
  const name = 'Q1';
  const Ns = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return (
    <section className="flex flex-col gap-5 p-5">
      {Ns.map(N => {
        // [1, ... , N^2]의 배열을 만들어서 Snake함수에 넘김
        const array = Array.from({ length: N * N }, (_, i) => i + 1);
        const answer = Snake(N, array);

        return (
          <SnakeViewer
            key={`snake-container-${name}-${N}`}
            name={name}
            N={N}
            array={answer}
          ></SnakeViewer>
        );
      })}
    </section>
  );
}
