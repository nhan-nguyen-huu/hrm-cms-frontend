import { CKEditor } from '@ckeditor/ckeditor5-react'
import {
  Base64UploadAdapter,
  BlockQuote,
  Bold,
  ClassicEditor,
  Essentials,
  FontBackgroundColor,
  FontColor,
  Heading,
  HorizontalLine,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  Italic,
  Link,
  List,
  Paragraph,
  Strikethrough,
  Table,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  Underline
} from 'ckeditor5'
import 'ckeditor5/ckeditor5.css'
import clsx from 'clsx'
import RenderIf from '~/components/common/render-if'

import styles from './styles.module.css'

interface ITextEditorProps {
  value?: string
  onChange?: (value?: string) => void
  isView?: boolean
  isInValid?: boolean
}
const TextEditor = ({ value, onChange, isView = false, isInValid = false }: ITextEditorProps) => {
  return (
    <section className={clsx('rounded-2xl', styles.wrapper, isInValid && styles.invalid)}>
      <RenderIf
        condition={!isView}
        whenTrue={
          <CKEditor
            editor={ClassicEditor}
            data={value}
            config={{
              licenseKey: 'GPL',

              plugins: [
                Essentials,
                Paragraph,
                Heading,

                Bold,
                Italic,
                Underline,
                Strikethrough,

                FontColor,
                FontBackgroundColor,

                List,
                Link,
                BlockQuote,
                HorizontalLine,

                Table,
                TableToolbar,
                TableProperties,
                TableCellProperties,
                TableColumnResize,

                Image,
                ImageToolbar,
                ImageCaption,
                ImageStyle,
                ImageResize,
                ImageInsert,
                Base64UploadAdapter
              ],

              toolbar: [
                'undo',
                'redo',
                '|',

                'heading',
                '|',

                'bold',
                'italic',
                'underline',
                'strikethrough',
                '|',

                'fontColor',
                'fontBackgroundColor',
                '|',

                'bulletedList',
                'numberedList',
                '|',

                'link',
                'insertTable',
                'blockQuote',
                'horizontalLine',
                'insertImage'
              ],

              table: {
                contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
              },

              image: {
                toolbar: [
                  'imageStyle:inline',
                  'imageStyle:block',
                  'imageStyle:side',
                  '|',
                  'toggleImageCaption',
                  'imageTextAlternative'
                ]
              }
            }}
            onChange={(_, editor) => {
              onChange?.(editor.getData())
            }}
          />
        }
        whenFalse={
          <article
            className='ck-content'
            dangerouslySetInnerHTML={{
              __html: value ?? ''
            }}
          />
        }
      />
    </section>
  )
}

export default TextEditor
