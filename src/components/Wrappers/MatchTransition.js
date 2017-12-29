import React from 'react'
import {
  Route
} from 'react-router-dom'
import { TransitionMotion, spring } from 'react-motion'

const styles = {}

styles.fill = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'none'
}

const FadeRoute = ({ component: Component, ...rest }) => {
  const willLeave = () => ({ zIndex: 1, opacity: spring(0) })

  return (
    <Route {...rest} children={({ location, match }) => (
      <TransitionMotion
        willLeave={willLeave}
        styles={match ? [ {
          key: location.pathname,
          style: { opacity: 1 },
          data: match
        } ] : []}
      >
        {interpolatedStyles => (
          <div>
            {interpolatedStyles.map(config => (
              <div
                key={config.key}
                style={{ ...styles.fill, ...config.style }}
              >
                <Component {...config.data}/>
              </div>
            ))}
          </div>
        )}
      </TransitionMotion>
    )}/>
  )
}

export default FadeRoute
