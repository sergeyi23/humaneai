import {
  Box,
  Heading,
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
  TabList,
  Text,
  Link,
  VStack,
  Grid,
} from "@chakra-ui/react"

import { DataSet } from "../components/DataSet"

export const Home = () => (
  <Box textAlign="center" fontSize="xl">
    <Grid minH="100vh" p={3}>
      <VStack spacing={8}>
        <Heading size="2xl">
          Humane AI
        </Heading>
        <Text>
          Crowsourced dataset powering future AGI for humanity
        </Text>
        <Tabs align='center' variant='soft-rounded'>
          <TabList>
            <Tab>Data Set</Tab>
            <Tab>Creators</Tab>
            <Tab>Verifiers</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <DataSet />
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Link
          color="teal.500"
          href="https://chakra-ui.com"
          fontSize="2xl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Chakra
        </Link>
      </VStack>
    </Grid>
  </Box>
)
