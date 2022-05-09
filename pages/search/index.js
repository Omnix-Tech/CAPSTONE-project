import React from 'react';
import Layout from '../../components/layout';
import useConnect from '../../controller/hooks/useConnect';

import { Box } from '@chakra-ui/react';
import SearchMainContainer from '../../components/Search/main';

export default function Search({ user }) {
  const { connectDocument: connect, connectsDocs } = useConnect(user)


  return (
    <Layout currentTab={'search'} >
      <Box px={{ base: 2, md: 10 }} >
        <SearchMainContainer user={user} connect={connect} connectsDocs={connectsDocs} />
      </Box>
    </Layout>
  );
}
