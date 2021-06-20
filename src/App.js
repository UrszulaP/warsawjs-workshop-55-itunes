import "./App.css";
import {
  Badge,
  Stack,
  Button,
  Input,

  Box,
  Spinner,
  Center,
  SimpleGrid,

  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  AspectRatio,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";


function LoadingSpinner(props) {
  const isLoadingg = props.isLoadingg;
  if (isLoadingg) {
    return <Spinner size="sm" />;
  }
  return null;
}



function DetailsModal({ result }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [artist, setArtist] = useState();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    (async () => {
      const artistResult = await fetch(
        `https://itunes.apple.com/lookup?id=${result.artistId}`
      );
      const data = await artistResult.json();
      setArtist(data.results[0]);
    })();
  }, [isOpen, result]);

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen} size="sm">
        Show video
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{result.trackName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {artist && (
              <Badge>
                {artist.artistName} ({artist.primaryGenreName})
              </Badge>
            )}
            <AspectRatio maxW="560px" ratio={1}>
              <iframe title="naruto" src={result.previewUrl} allowFullScreen />
            </AspectRatio>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}


function Itunes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const property = {
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: "Modern home in city center in the heart of historic Los Angeles",
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4,
  }

  return (
    <Stack direction="column" mt="5">
      <Center>
        <Stack direction="row" maxW="sm" mb="5">
          <Input
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          <LoadingSpinner isLoadingg={isLoading} />
          <Button
            colorScheme="teal"
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
            Search
          </Button>
        </Stack>
      </Center>

      <SimpleGrid columns={3} spacing={5}>
      {results.map((result) => (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Box p="6">
            <Box mb="3">
             <Center><img src={result.artworkUrl100} /></Center>
            </Box>
            <Box fontSize="sm" color="gray.500">
              {result.artistName}
            </Box>
            <Box fontSize="lg">
              {result.trackName}
            </Box>
            <Box mt="3">
              <DetailsModal result={result} />
            </Box>
          </Box>
        </Box>
      ))}
      </SimpleGrid>
    </Stack>
  );
}

function App(props) {

  return (
    <div className="App">
      <header className="App-header">
        <Stack direction="column">
          <Itunes />
        </Stack>
      </header>
    </div>
  );
}

export default App;