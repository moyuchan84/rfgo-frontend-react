import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HtmlEditor from 'devextreme-react/html-editor';
import { Box } from '@chakra-ui/react';

const RequestDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [requestContent, setRequestContent] = useState('');

  // In a real application, you would fetch the request content based on the ID
  // For now, let's use some placeholder HTML content
  useEffect(() => {
    // Simulate fetching data
    if (id) {
      setRequestContent(
        `<p>This is the detail for request <strong>#${id}</strong>.</p>
         <p>Here's some rich content:</p>
         <ul>
           <li>Item 1</li>
           <li>Item 2</li>
           <li>Item 3</li>
         </ul>
         <p><b>Bold text</b> and <i>italic text</i>.</p>
         <img src="https://via.placeholder.com/150" alt="Placeholder Image" />
        `
      );
    }
  }, [id]);

  return (
    <Box p={5}>
      <h2>Request Detail for ID: {id}</h2>
      <HtmlEditor
        value={requestContent}
        readOnly={true}
        height="auto"
        width="100%"
      />
    </Box>
  );
};

export default RequestDetail;