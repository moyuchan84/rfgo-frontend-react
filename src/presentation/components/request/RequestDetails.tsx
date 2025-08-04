import React from 'react';
import { TextBox } from 'devextreme-react';
import HtmlEditor, {
  Toolbar,
  Item,
  MediaResizing,
  ImageUpload,
} from 'devextreme-react/html-editor';
import { useRequestStore } from '../../../application/store/requestStore';
import { Box, Text, VStack } from '@chakra-ui/react';

const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];
const fontValues = [
  'Arial',
  'Courier New',
  'Georgia',
  'Lucida Console',
  'Tahoma',
  'Times New Roman',
  'Verdana',
];
const headerValues = [false, 1, 2, 3, 4, 5];
const fontSizeOptions = { inputAttr: { 'aria-label': 'Font size' } };
const fontFamilyOptions = { inputAttr: { 'aria-label': 'Font family' } };
const headerOptions = { inputAttr: { 'aria-label': 'Header style' } };
const currentTab = ['File', 'Url'];
const isMultiline = true;

const RequestDetails: React.FC = () => {
  const { title, content, setTitle, setContent } = useRequestStore();

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
      <VStack align="start" gap={4}>
        <VStack align="start" w="100%">
          <Text fontWeight="bold">의뢰제목</Text>
          <TextBox value={title} onValueChanged={(e) => setTitle(e.value)} width="100%" />
        </VStack>
        <VStack align="start" w="100%">
          <Text fontWeight="bold">의뢰내용</Text>
          <HtmlEditor
            value={content}
            onValueChanged={(e) => setContent(e.value)}
            height="auto"
            width="100%"
          >
            <MediaResizing enabled={true} />
            <Toolbar multiline={isMultiline}>
              <Item name="undo" />
              <Item name="redo" />
              <Item name="separator" />
              <Item name="size" acceptedValues={sizeValues} options={fontSizeOptions} />
              <Item name="font" acceptedValues={fontValues} options={fontFamilyOptions} />
              <Item name="separator" />
              <Item name="bold" />
              <Item name="italic" />
              <Item name="strike" />
              <Item name="underline" />
              <Item name="separator" />
              <Item name="alignLeft" />
              <Item name="alignCenter" />
              <Item name="alignRight" />
              <Item name="alignJustify" />
              <Item name="separator" />
              <Item name="orderedList" />
              <Item name="bulletList" />
              <Item name="separator" />
              <Item name="header" acceptedValues={headerValues} options={headerOptions} />
              <Item name="separator" />
              <Item name="color" />
              <Item name="background" />
              <Item name="separator" />
              <Item name="link" />
              <Item name="image" />
              <Item name="separator" />
              <Item name="clear" />
              <Item name="codeBlock" />
              <Item name="blockquote" />
              <Item name="separator" />
              <Item name="insertTable" />
              <Item name="deleteTable" />
              <Item name="insertRowAbove" />
              <Item name="insertRowBelow" />
              <Item name="deleteRow" />
              <Item name="insertColumnLeft" />
              <Item name="insertColumnRight" />
              <Item name="deleteColumn" />
            </Toolbar>
          </HtmlEditor>
        </VStack>
      </VStack>
    </Box>
  );
};

export default RequestDetails;
