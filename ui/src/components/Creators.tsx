import {
  Checkbox,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Link,
  Spinner,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

import { getCreators } from "../utils/theGraph";

type Creator = {
  id: string;
  owner: string;
  reputation: number;
  isActive: boolean;
}

export const Creators = () => {
  const [items, setItems] = useState<Creator[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
      getCreators()
        .then(json => {
          setLoading(false);
          setItems(json);
      })
    }, [])

  return (
      loading 
      ? <Spinner />
      :
      <TableContainer>
          <Table variant='simple'>
              <TableCaption>Data set indexed by <Link href="https://thegraph.com/hosted-service/subgraph/sergeyi23/humane-ai-dev" target="_blank">subgraph</Link> on The Graph network. <Link>Download as csv</Link></TableCaption>
              <Thead>
              <Tr>
                  <Th>ID</Th>
                  <Th>Address</Th>
                  <Th isNumeric>Reputation</Th>
                  <Th>Active</Th>
              </Tr>
              </Thead>
              <Tbody>
              {items.map(dataItem => (
                  <Tr key={dataItem.id}>
                      <Th>{dataItem.id}</Th>
                      <Th>{dataItem.id}</Th>
                      <Th isNumeric>{dataItem.reputation}</Th>
                      <Th><Checkbox isDisabled isChecked={dataItem.isActive}></Checkbox> </Th>
                  </Tr>
                  ))}
              </Tbody>
          </Table>
      </TableContainer>
  )
  }