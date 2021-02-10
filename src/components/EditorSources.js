const React = require('react')
const { connect } = require('react-redux')
const partial = require('lodash/partial')
const { withState } = require('recompose')

// Pure components

function EditorSourcesPure({
  // Props
  sources,

  // State
  newSource,
  setNewSource,

  // Handlers
  onAddSourceClick,
  onRemoveSourceClick,
  onUpdateSourceChange,
}) {
  return (
    <div className="panel">
      {/* Heading */}
      <div className="panel-heading" role="tab" id="sources-heading">
        <h4 className="panel-title">Sources</h4>
      </div>

      <div id="sources" aria-labelledby="sources-heading">
        <div className="panel-body">
          {/* List sources */}
          {sources.map((source) => (
            <p key={source.title}>
              {/* Update source */}
              <input
                type="text"
                defaultValue={source.title}
                className="form-control"
                onBlur={partial(onUpdateSourceChange, 'title')}
              />

              <input
                type="text"
                defaultValue={source.url}
                className="form-control"
                onBlur={partial(onUpdateSourceChange, 'url')}
              />

              {/* Remove source */}
              <button
                type="button"
                title="Add item"
                className="btn btn-info btn-sm json-editor-btn-add "
                onClick={partial(onRemoveSourceClick, source.title)}
              >
                Remove source
              </button>
            </p>
          ))}

          {/* Add source */}
          <input
            className="form-control"
            type="text"
            value={newSource}
            placeholder="Type source"
            onChange={(ev) => {
              setNewSource(ev.target.value)
            }}
          />
          <button
            type="button"
            className="btn btn-info btn-sm json-editor-btn-add "
            title="Add item"
            disabled={!newSource}
            onClick={(ev) => {
              onAddSourceClick(newSource, ev)
              setNewSource('')
            }}
          >
            Add source
          </button>
        </div>
      </div>
    </div>
  )
}

// State

const stateName = 'newSource'
const stateUpdaterName = 'setNewSource'
const initialState = ''

// Handlers

const mapDispatchToProps = (dispatch) => ({
  onAddSourceClick: (source) => {
    dispatch({
      type: 'ADD_SOURCE',
      source,
    })
  },

  onRemoveSourceClick: (source) => {
    dispatch({
      type: 'REMOVE_SOURCE',
      source,
    })
  },

  onUpdateSourceChange: (source, ev) => {
    dispatch({
      type: 'UPDATE_SOURCE',
      source,
      newSource: ev.target.value,
    })
  },
})

// Components

let EditorSources = withState(stateName, stateUpdaterName, initialState)(EditorSourcesPure)
EditorSources = connect(null, mapDispatchToProps)(EditorSources)

// System

module.exports = {
  // Public
  EditorSources,

  // Private
  EditorSourcesPure,
}
