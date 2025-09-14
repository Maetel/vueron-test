import Q3Text from '@/answers/Q3.md?raw';
import Markdown from 'react-markdown';

function Q3Container() {
  return (
    <section className="w-full h-full px-2 py-5 mx-auto prose">
      <Markdown>{Q3Text}</Markdown>
      <div className="pb-30"></div>
    </section>
  );
}

export default Q3Container;
