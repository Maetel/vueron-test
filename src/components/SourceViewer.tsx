import { cn } from '@/utils';
import { Highlight, themes } from 'prism-react-renderer';
import Button from './Button';

const GITHUB_BASE = 'https://github.com/Maetel/vueron-test/tree/main/src';

export interface SourceViewerProps {
  name: string;
  source: string;
}
export default function SourceViewer(props: SourceViewerProps) {
  const { name, source } = props;

  return (
    <article>
      <div className="flex items-center mb-0.5">
        <h3>{name}</h3>
        <Button
          className="ml-3"
          onClick={() => {
            window.open(`${GITHUB_BASE}/${name.replace('@/', '')}`, '_blank');
          }}
        >
          소스열기
        </Button>
      </div>

      <Highlight
        theme={themes.vsDark}
        code={source}
        language={name.endsWith('tsx') ? 'tsx' : 'ts'}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(className, 'px-2 py-1 box-border overflow-x-auto')}
            style={style}
          >
            {tokens.map((line, i) => (
              <div
                {...getLineProps({ line })}
                key={`source-detail-${name}-${i}`}
              >
                {line.map((token, key) => (
                  <span
                    {...getTokenProps({ token })}
                    key={`source-token-${name}-${i}-${key}`}
                  />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </article>
  );
}
