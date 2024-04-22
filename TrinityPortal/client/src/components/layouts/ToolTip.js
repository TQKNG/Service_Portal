import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function ToolTipComp({myButton, type, module}) {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {`${type} ${module}`}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      {myButton}
    </OverlayTrigger>
  );
}

export default ToolTipComp;