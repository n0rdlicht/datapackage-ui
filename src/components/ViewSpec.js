const React = require('react')
const { withProps } = require('recompose')
const { connect } = require('react-redux')
const { LegendEntry } = require('./LegendEntry')

// Pure components

function ViewSpecPure({
  // Props
  descriptor,
  viewIndex,

  // Handlers
  onAddLegendClick,
}) {
  return (
    <div className="data-cards sortable">
      {/* Fields */}
      {descriptor.legend.map((legendDescriptor, legendIndex) => (
        <div className="draggable card" key={legendDescriptor._key}>
          <div className="inner">
            <LegendEntry
              viewIndex={viewIndex}
              legendIndex={legendIndex}
              descriptor={legendDescriptor}
            />
          </div>
        </div>
      ))}

      {/* Add field */}
      <div className="add card">
        <button className="inner" onClick={onAddLegendClick}>
          <svg>
            <use xlinkHref="#icon-plus" />
          </svg>{' '}
          Add Legend
        </button>
      </div>
    </div>
  )
}

// Handlers

const mapDispatchToProps = (dispatch, { viewIndex }) => ({
    onAddLegendClick: () => {
    dispatch({
      type: 'ADD_VIEW_LEGEND',
      viewIndex,
    })
  },
})

// Computers

function computeProps({ descriptor }) {
    return {  }
  }

// Componenets

let ViewSpec = connect(null, mapDispatchToProps)(ViewSpecPure)
ViewSpec = withProps(computeProps)(ViewSpec)

// System

module.exports = {
  // Public
  ViewSpec,

  // Private
  ViewSpecPure,
}
