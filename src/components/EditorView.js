const React = require('react')
const { Readable } = require('stream')
const { Table } = require('tableschema')
const { connect } = require('react-redux')
const classNames = require('classnames')
const partial = require('lodash/partial')
const { withState } = require('recompose')
const { ViewSpec } = require('./ViewSpec')

// Pure components

function EditorViewPure({
  // Props
  descriptor,
  viewIndex,

  // State
  isSettingsActive,
  setIsSettingsActive,

  // Handlers
  onRemoveClick,
  onUpdateChange,
  onUpdateChangeSpec,
}) {
  const references = {}
  const panelHeadingId = `view-${viewIndex}-heading`

  return (
    <div className="panel">
      {/* Metadata */}
      <div className="panel-heading" role="tab" id={panelHeadingId}>
        <div className="title" style={{ width: '90%' }}>
          <div className="row">
            {/* Name */}
            <div className="col-sm-3">
              <div className="input-group">
                <span className="input-group-addon" id="basic-addon1">
                  Name
                </span>
                <input
                  className="form-control"
                  autoComplete="off"
                  type="text"
                  defaultValue={descriptor.name}
                  onBlur={partial(onUpdateChange, 'name')}
                />
              </div>
            </div>

            <div className="col-sm-9">
              <div className="input-group">
                {/* Title */}
                <span className="input-group-addon" id="basic-addon1">
                  Title
                </span>
                <input
                  className="form-control"
                  autoComplete="off"
                  type="text"
                  pattern="^([a-z0-9._-])+$"
                  defaultValue={descriptor.spec.title}
                  placeholder="Set a view title"
                  onBlur={partial(onUpdateChangeSpec, 'title')}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="actions">
          {/* Remove */}
          <a role="button" onClick={onRemoveClick}>
            <svg>
              <use xlinkHref="#icon-trashcan" />
            </svg>
            <span className="text">Remove</span>
          </a>

          {/* Settings */}
          <a
            className={classNames('settings-button', 'action', { active: isSettingsActive })}
            onClick={() => {
              setIsSettingsActive(!isSettingsActive)
            }}
          >
            <svg>
              <use xlinkHref="#icon-settings" />
            </svg>
            <span className="text">Settings</span>
          </a>

          {/* Expand/collapse */}
          <a
            role="button"
            data-toggle="collapse"
            href={`#collapse-view-${viewIndex}`}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <svg>
              <use xlinkHref="#icon-expand" />
            </svg>
            <span className="text">Expand / collapse</span>
          </a>
        </div>

        <div className={classNames('settings', { active: isSettingsActive })}>
          <span>
            {/* specType */}
            <label htmlFor={makeId(descriptor, 'specType')} className="control-label">
              View Specification
            </label>
            <select
              id={makeId(descriptor, 'specType')}
              data-id="list-container"
              className="form-control list-container"
              autoComplete="off"
              defaultValue={descriptor.specType}
              onChange={partial(onUpdateChange, 'specType')}
            >
              <option value="gemeindescanSnapshot">gemeindescanSnapshot</option>
            </select>
          </span>
          <span>
            {/* Description */}
            <label htmlFor={makeId(descriptor, 'description')} className="control-label">
              Description
            </label>
            <textarea
              id={makeId(descriptor, 'description')}
              className="form-control"
              data-schemaformat="textarea"
              name="root[views][0][description]"
              defaultValue={descriptor.spec.description}
              onBlur={partial(onUpdateChangeSpec, 'description')}
            />
          </span>
        </div>
      </div>

      {/* Schema */}
      <div
        id={`collapse-view-${viewIndex}`}
        className={classNames('panel-collapse', 'collapse', 'in')}
        role="tabpanel"
        aria-labelledby={panelHeadingId}
      >
        <div className="panel-body">
          <ViewSpec descriptor={descriptor.spec} viewIndex={viewIndex} />
        </div>
      </div>
    </div>
  )
}

// State

const stateName = 'isSettingsActive'
const stateUpdaterName = 'setIsSettingsActive'
const initialState = false

// Handlers

const mapDispatchToProps = (dispatch, { viewIndex, descriptor }) => ({
  onRemoveClick: () => {
    dispatch({
      type: 'REMOVE_VIEW',
      viewIndex,
    })
  },

  onUpdateChange: (name, ev) => {
    dispatch({
      type: 'UPDATE_VIEW',
      payload: { [name]: ev.target.value },
      viewIndex,
    })
  },

  onUpdateChangeSpec: (name, ev) => {
      dispatch({
          type: 'UPDATE_VIEW_SPEC',
          payload: { [name]: ev.target.value },
          viewIndex,
      })
  }

})

// Helpers

function makeId(descriptor, key) {
  return `view-${descriptor._key}-${key}`
}

// Settings

const EDITOR_UPLOAD_ROWS_LIMIT = 100

// Wrappers

let EditorView = withState(stateName, stateUpdaterName, initialState)(EditorViewPure)
EditorView = connect(null, mapDispatchToProps)(EditorView)

// System

module.exports = {
  // Public
  EditorView,

  // Private
  EditorViewPure,
}
