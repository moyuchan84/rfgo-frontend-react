import React from 'react';
import { VStack, Heading } from '@chakra-ui/react';
import '../../styles/common.scss';
import { TextBox } from 'devextreme-react/text-box';
import { DataGrid } from 'devextreme-react/data-grid';

const Home: React.FC = () => {
  const customers = [
    {
      'Company Name': 'Super Mart of the West',
      City: 'Bentonville',
      State: 'Arkansas',
      Phone: '(800) 555-2797',
      Fax: '(800) 555-2171',
    },
    {
      'Company Name': 'Electronics Depot',
      City: 'Atlanta',
      State: 'Georgia',
      Phone: '(800) 595-3232',
      Fax: '(800) 595-3231',
    },
    {
      'Company Name': 'K&S Music',
      City: 'Minneapolis',
      State: 'Minnesota',
      Phone: '(612) 304-6073',
      Fax: '(612) 304-6074',
    },
    {
      'Company Name': "Tom's Club",
      City: 'Issaquah',
      State: 'Washington',
      Phone: '(800) 955-2292',
      Fax: '(800) 955-2293',
    },
    {
      'Company Name': 'E-Mart',
      City: 'Hoffman Estates',
      State: 'Illinois',
      Phone: '(847) 286-2500',
      Fax: '(847) 286-2501',
    },
  ];

  return (
    <VStack gap={8} justify="center" align="center" height="75vh">
      <Heading as="h1" size="2xl" mb={4}>
        RFGo
      </Heading>
      <TextBox
        placeholder="Google 검색 또는 URL 입력"
        width="584px"
        height="46px"
        stylingMode="outlined"
        elementAttr={{ class: 'rounded-textbox' }}
      />
      <DataGrid dataSource={customers} showBorders={true} width="80%" columnAutoWidth={true} />
    </VStack>
  );
};

export default Home;
