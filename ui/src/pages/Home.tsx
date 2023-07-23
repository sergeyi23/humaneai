import {
  Box,
  Heading,
  Image,
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
import { Creators } from "../components/Creators"
import { Verifiers } from "../components/Verifiers"

export const Home = () => (
  <Box textAlign="center" fontSize="xl">
    <Grid minH="100vh" p={3}>
      <VStack spacing={8}>
        <Heading size="2xl">
          <VStack>
            <Image src="logo192.png" ></Image> 
            <Text>Humane AI</Text>
          </VStack>
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
              <Creators />
            </TabPanel>
            <TabPanel>
              <Verifiers />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Link
          color="teal.500"
          href="https://github.com/sergeyi23/humaneai"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub repository
        </Link>
      </VStack>
    </Grid>
  </Box>
)
