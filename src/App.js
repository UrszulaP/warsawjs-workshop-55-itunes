import "./App.css";
import {
  Badge,
  Stack,
  Button,
  UnorderedList,
  ListItem,
  Input,
  
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  
  Box,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";


function LoadingSpinner(props) {
  const isLoadingg = props.isLoadingg;
  if (isLoadingg) {
    return <Spinner size="sm" />;
  }
  return null;
}


function Itunes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([
    {
      trackName: "WarsawJS",
    },
    {
      trackName: "React",
    },
    {
      trackName: "Itunes",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Stack direction="column">
      <Stack direction="row">
        <Input
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <Button
          colorScheme="blue" colorScheme="teal"
          onClick={async () => {
            setIsLoading(true);
            const result = await fetch(
              `https://itunes.apple.com/search?term=${encodeURIComponent(
                searchTerm
              )}&entity=musicVideo`
            );
            const data = await result.json();
            setIsLoading(false);
            setResults(data.results);
            console.log(data);
          }}
        >
          Search <LoadingSpinner isLoadingg={isLoading} />
        </Button>    
      </Stack>
      
      <Box maxW="lg" borderWidth="1px" borderRadius="lg" pt="3">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Track name</Th>
              <Th>Artist Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {results.map((result) => (
              <Tr>
                <Td>{result.trackName}</Td>
                <Td>{result.artistName}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Stack>
  );
}

function App(props) {
  // const result = useState(0);
  // const count = result[0];
  // const setCount = result[1];
  // const [count, setCount] = useState(5);

  return (
    <div className="App">
      <header className="App-header">
        <Stack direction="column">
          <Itunes />
          {/* <Stack direction="row">
            <Badge>{count}</Badge>
            <Button
              colorScheme="green"
              onClick={() => {
                setCount(count + 1);
              }}
            >
              +
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                setCount(count - 1);
              }}
            >
              -
            </Button>
          </Stack> */}
        </Stack>
      </header>
    </div>
  );
}

export default App;