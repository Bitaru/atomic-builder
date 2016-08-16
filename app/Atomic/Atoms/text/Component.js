import cx from 'classnames';
import Draft from 'Editor/draft';
import { stateToHTML } from 'draft-js-export-html';
import { EditorState } from 'draft-js';

import styles from './styles.css';
import typo from './typo.css';

const Content = ({ content }) => {
  if (!content) return <p className={styles.placeholder}>Enter text here</p>;
  if (content instanceof EditorState) {
    const __html = stateToHTML(content.getCurrentContent());
    return <div dangerouslySetInnerHTML={{ __html }} />;
  }
  return content;
};

export default ({
  content,
  active,
  deactivate,
  settings,
  onChange
}) => {
  const [url, cover, { x, y }, repeat] = settings.get('backgroundImage');

  return (
    <div
      className={cx('editor-text', styles.wrap)}
      style={{
        background: settings.get('backgroundImage') && `url(${url}) ${x} ${y} ${repeat}`,
        backgroundSize: settings.get('backgroundImage') && cover,
        backgroundColor: settings.get('backgroundColor'),
        padding: settings.get('padding')
      }}>
    {
      !active
      ? <div className={typo.content}><Content content={content} /></div>
      : <Draft value={content} onChange={onChange} onBlur={deactivate} />
    }
    </div>
  );
};

