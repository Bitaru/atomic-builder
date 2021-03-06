import { compose, withState, withProps, withHandlers } from 'recompose';
import cx from 'classnames';
import Select from 'react-select';
import Icon from 'Editor/components/Icon';
import SettingsTitle from '../SettingsTitle';
import ColorPicker from '../ColorPicker';

import styles from './styles.css';
import './react-select.css';

const weightTable = {
  300: 'thin',
  400: 'normal',
  700: 'bold'
};

const options = [
  { label: 'Open Sans', value: '"Open Sans", sans-serif' },
  { label: 'Roboto Condensed', value: '"Roboto Condensed", sans-serif' },
  { label: 'Arial, Helvetica', value: 'Arial, Helvetica, sans-serif' },
  { label: 'Lucida Console', value: '"Lucida Console", Monaco, monospace' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
  { label: 'Tahoma', value: 'Tahoma, Geneva, sans-serif' },
  { label: 'Palatino, Book Antiqua', value: '"Palatino Linotype", "Book Antiqua", Palatino, serif' }
];

export default compose(
  withState('family', 'setFamily', props => props.value.family),
  withState('size', 'setSize', props => props.value.size),
  withState('style', 'setStyle', props => props.value.style),
  withState('weight', 'setWeight', props => props.value.weight),
  withState('decoration', 'setDecoration', props => props.value.decoration),
  withState('transform', 'setTransform', props => props.value.transform),
  withState('lineHeight', 'setLineHeight', props => props.value.lineHeight),
  withState('letterSpacing', 'setLetterSpacing', props => props.value.letterSpacing),
  withState('color', 'setColor', props => props.value.color),
  withHandlers({
    onFamilyChange: props => option => {
      props.setFamily(option.value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        family: option.value
      });
    },
    onSizeChange: props => e => {
      const value = e.target.value;
      props.setSize(value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        size: value
      });
    },
    onStyleChange: props => e => {
      const value = e.target.checked ? 'italic' : 'normal';
      props.setStyle(value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        style: value
      });
    },
    onWeightChange: props => e => {
      const value = e.target.checked ? '700' : '400';
      props.setWeight(value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        weight: value
      });
    },
    onDecorationChange: props => e => {
      const value = e.target.value;
      props.setDecoration(value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        decoration: value
      });
    },
    onTransformChange: props => e => {
      const value = e.target.value;
      props.setTransform(value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        transform: value
      });
    },
    onLineHeightChange: props => e => {
      const value = e.target.value;
      props.setLineHeight(value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        lineHeight: value
      });
    },
    onLetterSpacingChange: props => e => {
      const value = e.target.value;
      props.setLetterSpacing(value);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        letterSpacing: value
      });
    },
    onColorChange: props => color => {
      props.setColor(color.hex);
      props.onSettingsChange && props.onSettingsChange(props.settingKey, {
        ...props.value,
        color: color.hex
      });
    },
    renderOption: props => option => (
      <span className='react-select__option' style={{ fontFamily: option.value }}>{option.label}</span>
    ),
    renderValue: props => (option) => (
      <strong style={{ color: option.color }}>{option.label}</strong>
    )
  })
)(({
  label,
  size,
  weight,
  family,
  style,
  decoration,
  transform,
  letterSpacing,
  lineHeight,
  color,
  onSizeChange,
  onWeightChange,
  onFamilyChange,
  onStyleChange,
  onDecorationChange,
  onTransformChange,
  onLetterSpacingChange,
  onLineHeightChange,
  onColorChange,
  renderOption,
  renderValue,
  ...props
}) => (
  <SettingsTitle label={label}>
    {
      !props.value.active &&
      <div>
        <div className={styles.font__controls}>
          <div className={styles.font__inputBox}>
            <label
              htmlFor='familyId'
              className={styles.font__label}>
              Font family
            </label>
            <Select
              placeholder='Please select a font family'
              options={options}
              optionRenderer={renderOption}
              onChange={onFamilyChange}
              value={family}
              valueRenderer={renderValue}
              clearable={false}
            />
          </div>
          <div
            className={cx(
              styles.font__inputBox,
              styles.font__inputBox_size
            )}>
            <label
              htmlFor='sizeId'
              className={styles.font__label}>
              Size (px):
            </label>
            <input
              type='number'
              onChange={onSizeChange}
              id='sizeId'
              value={size}          
              className={cx(
                styles.font__input
              )} />
          </div>
        </div>
        <div className={styles.font__controlsContainer}>
        <div className={styles.font__controls}>
          <div className={styles.font__labelBox}>
            <span className={styles.font__title}>Font styles:</span>
          </div>
          <div
            className={cx(
              styles.font__inputBox,
              styles.font__inputBox_checkbox
            )}>
            <input
              type='checkbox'
              onChange={onStyleChange}
              id='styleId'
              value='italic'
              checked={style === 'italic'}
            />
            <label
              htmlFor='styleId'
              className={cx(styles.font__labelOptions)}>
                <Icon width='24' height='24' value='italic' />
            </label>
          </div>
          <div
            className={cx(
              styles.font__inputBox,
              styles.font__inputBox_checkbox
            )}>
            <input
              type='checkbox'
              onChange={onWeightChange}
              id='weightId'
              value='700'
              name='fontWeight'
              checked={weight === '700'}
            />
            <label
              htmlFor='weightId'
              className={cx(styles.font__labelOptions)}>
                <Icon width='24' height='24' value='bold' />
            </label>
          </div>
        </div>
        <div className={styles.font__controls}>
          <div className={styles.font__labelBox}>
            <span className={styles.font__title}>Text spacing:</span>
          </div>
          <div
            className={cx(
              styles.font__inputBox,
              styles.font__inputBox_iconInput
            )}>
            <label
              htmlFor='lhId'
              className={cx(styles.font__labelIcon)}>
                <Icon width='18' height='18' value='lineHeight' />
            </label>
            <input
              type='number'
              onChange={onLineHeightChange}
              id='lhId'
              value={lineHeight}
              className={cx(
                styles.font__input_icon
              )}
            />
            <span className={cx(styles.font__inputTip)}>%</span>
          </div>
          <div
            className={cx(
              styles.font__inputBox,
              styles.font__inputBox_iconInput
            )}>
            <label
              htmlFor='lsId'
              className={cx(styles.font__labelIcon)}>
                <Icon width='18' height='14' value='letterSpacing' />
            </label>
            <input
              type='number'
              onChange={onLetterSpacingChange}
              id='lsId'
              value={letterSpacing}
              className={cx(
                styles.font__input_icon
              )}
            />
            <span className={cx(styles.font__inputTip)}>px</span>
          </div>
        </div>
        <div className={styles.font__controls}>
          <div className={styles.font__labelBox}>
            <span className={styles.font__title}>Text decoration:</span>
          </div>
            {
              ['line-through', 'underline', 'none'].map((decorationValue) => (
                <div
                  key={`decoration-${decorationValue}`}
                  className={cx(styles.font__inputBox, styles.font__inputBox_radio)}
                >
                  <input
                    type='radio'
                    onChange={onDecorationChange}
                    id={`decorationId-${decorationValue}`}
                    value={decorationValue}
                    name='fontDecoration'
                    checked={decoration === decorationValue}
                  />
                  <label
                    htmlFor={`decorationId-${decorationValue}`}
                    className={cx(styles.font__labelOptions)}>
                      {
                        decorationValue === 'none' ? 'none' : <Icon width='24' height='24' value={decorationValue} />
                      }
                  </label>
                </div>
              ))
            }
        </div>
        <div className={styles.font__controls}>
          <div className={styles.font__labelBox}>
            <span className={styles.font__title}>Text case:</span>
          </div>
            {
              ['lowercase', 'uppercase', 'none'].map((caseValue) => (
                <div
                  key={`style-${caseValue}`}
                  className={cx(styles.font__inputBox, styles.font__inputBox_radio)}>
                  <input
                    type='radio'
                    onChange={onTransformChange}
                    id={`caseId-${caseValue}`}
                    value={caseValue}
                    name='fontCase'
                    checked={transform === caseValue}
                  />
                  <label
                    htmlFor={`caseId-${caseValue}`}
                    className={cx(styles.font__labelOptions)}>
                      {
                        caseValue === 'none' ? 'none' : <Icon width='24' height='24' value={caseValue} />
                      }
                  </label>
                </div>
              ))
            }
        </div>
        </div>
      </div>
    }
    <ColorPicker
      color={color}
      onColorChange={onColorChange}
    />
  </SettingsTitle>
));
