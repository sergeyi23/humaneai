import {
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

  import { getDataSetItems } from "../utils/theGraph";

  type DataSetItem = {
    id: string;
    contentIpfsHash: string;
    rating: number;
    author: string;
  }
  
  export const DataSet = () => {
    const [dataSetItems, setDataSetItems] = useState<DataSetItem[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        getDataSetItems()
          .then(json => {
            setLoading(false);
            setDataSetItems(json);
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
                    <Th>Content</Th>
                    <Th isNumeric>Rating</Th>
                    <Th>Author</Th>
                </Tr>
                </Thead>
                <Tbody>
                {dataSetItems.map(dataItem => (
                    <Tr key={dataItem.id}>
                        <Th>{dataItem.id}</Th>
                        <Th><Link href="https://ipfs.io/ipfs/{dataItem.contentIpfsHash}" target="_blank">{dataItem.contentIpfsHash}</Link></Th>
                        <Th isNumeric>{dataItem.rating}</Th>
                        <Th>{dataItem.author}</Th>
                    </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
    }