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
} from "@chakra-ui/react";
import { useState } from "react";

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
          colorScheme="blue"
          onClick={async () => {
            const result = await fetch(
              `https://itunes.apple.com/search?term=${encodeURIComponent(
                searchTerm
              )}&entity=musicVideo`
            );
            const data = await result.json();
            setResults(data.results);
          }}
        >
          Search
        </Button>
      </Stack>
      
      {/* <UnorderedList>
        {results.map((result) => (
          <ListItem>
            {result.trackName} ({result.artistName})
          </ListItem>
        ))}
      </UnorderedList> */}
      
      <Box maxW="lg" borderWidth="1px" borderRadius="lg" fontSize="sm">
        <Table variant="simple">
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
  const [count, setCount] = useState(5);

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