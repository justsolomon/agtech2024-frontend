import { HStack, Text, VStack } from '@chakra-ui/react';
import { Popup } from 'react-leaflet';
import { FarmIssue, PenMarkerInfo } from 'types';

interface MarkerPopupProps {
  data: PenMarkerInfo | FarmIssue;
}

const MarkerPopup = ({ data }: MarkerPopupProps) => {
  const penFields = [
    { label: 'Pen number', key: 'number' },
    { label: 'Animal type', key: 'animalType' },
    { label: 'Animal count', key: 'animalCount' },
    { label: 'Feed type', key: 'feedType' },
    { label: 'Feed tonnage', key: 'feedTonnage' },
  ];

  const issueFields = [
    { label: 'Type', key: 'type' },
    { label: 'Description', key: 'description' },
    { label: 'Logged by', key: 'loggedBy' },
    { label: 'Created at', key: 'createdAt' },
  ];

  const fieldsToDisplay = data.hasOwnProperty('number')
    ? penFields
    : issueFields;

  return (
    <Popup>
      <VStack align="flex-start" spacing={0}>
        {fieldsToDisplay.map(({ label, key }) => (
          <HStack key={key} fontSize="14px">
            <Text fontWeight="bold">{label}:</Text>
            <Text>
              {key === 'createdAt'
                ? //@ts-ignore
                  new Date(data[key]).toLocaleDateString()
                : //@ts-ignore
                  data[key]}
            </Text>
          </HStack>
        ))}
      </VStack>
    </Popup>
  );
};

export default MarkerPopup;
