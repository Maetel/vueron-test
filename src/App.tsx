import Button from '@/components/Button';
import { cn } from '@/utils';
import { useEffect, useState } from 'react';

import SourceViewer from '@/components/SourceViewer';
import { Tab, TABS } from '@/Tabs';

export default function App() {
  const firstEnabled = TABS.findIndex(t => Boolean(t.component));
  const [tab, setTab] = useState(firstEnabled);

  const curTab = TABS[tab];

  const show =
    new URLSearchParams(window.location.search).get('pass') === '황원준';
  if (!show) {
    return null;
  }

  return (
    <div className="w-dvw h-dvh flex flex-col relative">
      <div
        className="flex h-6 overflow-x-auto gap-0.5"
        style={{
          scrollbarWidth: 'none',
        }}
      >
        {TABS.map((t, i) => (
          <Button
            className={cn(
              'rounded-b-none px-2 text-sm',
              tab === i ? 'bg-blue-300' : '',
            )}
            key={t.name}
            onClick={() => setTab(i)}
            disabled={!Boolean(TABS[i].component)}
          >
            {t.name}
          </Button>
        ))}
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto relative">
        {curTab.component}

        {/* 우측 소스보기 패널 */}
        {curTab.source && <SourceViewPanel tab={curTab}></SourceViewPanel>}
      </div>
    </div>
  );
}

// 우측 소스보기 패널
function SourceViewPanel({ tab }: { tab: Tab }) {
  const [sourceOpen, setSourceOpen] = useState(false);

  useEffect(() => {
    const closeSource = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSourceOpen(false);
      }
    };
    window.addEventListener('keydown', closeSource);

    return () => {
      window.removeEventListener('keydown', closeSource);
    };
  }, []);

  return (
    <div
      className={cn(
        'fixed max-h-[90%] max-w-[min(1024px,95%)] right-6 bottom-3 rounded-md bg-blue-100 shadow-2xl overflow-y-scroll',
      )}
    >
      {sourceOpen ? (
        <div className="w-full max-h-[80%] flex flex-col">
          <Button
            className="w-full h-7 rounded-b-none"
            onClick={() => {
              setSourceOpen(false);
            }}
          >
            소스 닫기
          </Button>
          <section className="flex-1 min-h-0 p-3 box-border">
            <h2 className="font-bold italic">{tab.source!.name}</h2>

            {tab.source!.sources.map(({ name, text: source }) => {
              return (
                <article key={`source-article-${tab.source!.name}-${name}`}>
                  <div className="mt-5"></div>
                  <SourceViewer name={name} source={source}></SourceViewer>
                </article>
              );
            })}
          </section>
        </div>
      ) : (
        <Button
          onClick={() => {
            setSourceOpen(true);
          }}
        >
          소스 보기
        </Button>
      )}
    </div>
  );
}
