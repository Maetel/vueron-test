import { cn } from '@/utils';
import { Highlight, themes } from 'prism-react-renderer';

export interface SourceViewerProps {
  name: string;
  source: string;
}
export default function SourceViewer(props: SourceViewerProps) {
  const { name, source } = props;

  return (
    <article>
      <h3>{name}</h3>
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
