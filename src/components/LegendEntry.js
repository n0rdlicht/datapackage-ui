const React = require('react')
const { connect } = require('react-redux')
const partial = require('lodash/partial')

// Pure components

function LegendEntryPure({
  // Props
//   column,
  descriptor,
  // fieldIndex,
  legendIndex,

  // Handlers
  onRemoveClick,
  onUpdateChange,
}) {
  return (
    <div>
      {/* Heading */}
      <header>
        {/* Name */}
        <input
          type="text"
          defaultValue={descriptor.label}
          style={{
            color: 'white',
            backgroundColor: '#3A3A3A',
            border: 'solid 1px #3A3A3A',
            paddingLeft: '0.5em',
            paddingRight: '0.5em',
          }}
          onBlur={partial(onUpdateChange, 'label')}
        />

        {/* Remove */}
        <button type="button" className="action" aria-label="Remove" onClick={onRemoveClick}>
          <svg>
            <use xlinkHref="#icon-trashcan" />
          </svg>
        </button>
      </header>

      {/* Preview */}
      {/* <div className="preview">
        <ol>
          {!!column &&
            column.values.slice(0, 10).map((value, index) => (
              <li key={index}>
                <span>{value}</span>
              </li> // eslint-disable-line react/no-array-index-key
            ))}
        </ol>
      </div> */}

        {/* // "label": "1 VZÄ & Einwohner",
        // "size": 0.4,
        // "shape": "circle",
        // "primary": true,
        // "fillColor": "#000000",
        // "fillOpacity": 0.6,
        // "strokeColor": "#232323",
        // "strokeWidth": 1.0,
        // "strokeOpacity": 0.8 */}

      {/* Metadata */}
      <div className="field-info">
        {/* size */}
        <label htmlFor={makeId(descriptor, 'size')}>Size</label>
        <input
          type="number"
          id={makeId(descriptor, 'size')}
          defaultValue={descriptor.size}
          onBlur={partial(onUpdateChange, 'size')}
        />

        {/* primary */}
        <label htmlFor={makeId(descriptor, 'primary')}>Always visible</label>
        <input
          type="boolean"
          id={makeId(descriptor, 'primary')}
          defaultValue={descriptor.primary}
          onBlur={partial(onUpdateChange, 'primary')}
        />

        {/* fillColor */}
        <label htmlFor={makeId(descriptor, 'fillColor')}>Fill color</label>
        <input
          type="text"
          id={makeId(descriptor, 'fillColor')}
          defaultValue={descriptor.fillColor}
          onBlur={partial(onUpdateChange, 'fillColor')}
        />

        {/* fillOpacity */}
        <label htmlFor={makeId(descriptor, 'fillOpacity')}>Fill opacity</label>
        <input
          type="text"
          id={makeId(descriptor, 'fillOpacity')}
          defaultValue={descriptor.fillOpacity}
          onBlur={partial(onUpdateChange, 'fillOpacity')}
        />

        {/* strokeColor */}
        <label htmlFor={makeId(descriptor, 'strokeColor')}>Stroke color</label>
        <input
          type="text"
          id={makeId(descriptor, 'strokeColor')}
          defaultValue={descriptor.strokeColor}
          onBlur={partial(onUpdateChange, 'strokeColor')}
        />

        {/* strokeOpacity */}
        <label htmlFor={makeId(descriptor, 'strokeOpacity')}>Stroke opacity</label>
        <input
          type="text"
          id={makeId(descriptor, 'strokeOpacity')}
          defaultValue={descriptor.strokeOpacity}
          onBlur={partial(onUpdateChange, 'strokeOpacity')}
        />

        {/* strokeWidth */}
        <label htmlFor={makeId(descriptor, 'strokeWidth')}>Stroke width</label>
        <input
          type="text"
          id={makeId(descriptor, 'strokeWidth')}
          defaultValue={descriptor.strokeWidth}
          onBlur={partial(onUpdateChange, 'strokeWidth')}
        />

        {/* Type */}
        <label htmlFor={makeId(descriptor, 'shape')}>Geometry Type</label>
        <select
          id={makeId(descriptor, 'shape')}
          data-id="list-container"
          className="form-control list-container"
          autoComplete="off"
          defaultValue={descriptor.type}
          onChange={partial(onUpdateChange, 'shape')}
        >
          {LEGEND_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

// Handlers

const mapDispatchToProps = (dispatch, { viewIndex, legendIndex }) => ({
  onRemoveClick: () => {
    dispatch({
      type: 'REMOVE_VIEW_LEGEND',
      viewIndex,
      legendIndex,
    })
  },

  onUpdateChange: (name, ev) => {
    dispatch({
      type: 'UPDATE_VIEW_LEGEND',
      payload: { [name]: ev.target.value },
      viewIndex,
      legendIndex,
    })
  },
})

// Helpers

function makeId(descriptor, key) {
  return `legend-${descriptor._key}-${key}`
}

// Settings

const LEGEND_TYPES = [
  "circle","square","line" 
]

// Components

const LegendEntry = connect(null, mapDispatchToProps)(LegendEntryPure)

// System

module.exports = {
  // Public
  LegendEntry,

  // Private
  LegendEntryPure,
}
