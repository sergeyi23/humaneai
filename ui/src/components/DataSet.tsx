import {
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Link,
  } from "@chakra-ui/react"
  import { useEffect, useState } from "react"

  type DataSetItem = {
    id: string;
    content: string;
    rating: number;
    author: string;
  }
  
  export const DataSet = () => {
    const [dataSetItems, setDataSetItems] = useState<DataSetItem[]>([])
    
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
          .then(response => response.json())
          .then(json => setDataSetItems(json))
      }, [])

    return (
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>Data set indexed by subgraph on The Graph network. <Link>Download as csv</Link></TableCaption>
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
                        <Th>{dataItem.content}</Th>
                        <Th isNumeric>{dataItem.rating}</Th>
                        <Th>{dataItem.author}</Th>
                    </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
    }