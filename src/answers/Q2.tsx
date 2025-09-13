import Snake from '@/answers/Snake';
import SnakeViewer from '@/components/SnakeViewer';

export default function Q2() {
  const name = 'Q2';
  const Ns = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return (
    <section className="flex flex-col gap-5 p-5">
      {Ns.map(N => {
        // [1, 0, 2, 0, 3, 0, ,,,]
        let num = 1;
        const array = Array.from({ length: N * N }, (_, i) => {
          if (i % 2 === 0) {
            return num++;
          } else {
            return 0;
          }
        });
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
