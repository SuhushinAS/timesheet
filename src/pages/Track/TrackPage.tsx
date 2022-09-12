import { useMessage } from 'entities/locale/lib/hooks';
import { Message } from 'entities/locale/ui/Message';
import { TrackListLoad } from 'entities/track/ui/TrackListLoad';
import React, { FC, useMemo } from 'react';
import { dateRange } from 'shared/config/constants';
import { Container } from 'widgets/Container';
import { Head } from 'widgets/Head';
import { Layout } from 'widgets/Layout';

export const TrackPage: FC = () => {
  const message = useMessage();
  const filter = useMemo(() => JSON.stringify({
    createdAt: {
      from: dateRange.from,
      to: dateRange.to,
    },
  }), []);

  return (
    <Layout head={<Head description={message('track.list.description')} title={message('track.list.title')} />}>
      <Container>
        <h1>
          <Message id="track.list.title" />
        </h1>
        <TrackListLoad filter={filter} />
      </Container>
    </Layout>
  );
};
