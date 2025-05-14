import React from 'react';
import PropTypes from 'prop-types';

const KpiCard = ({ title, value, icon, footer }) => (
    <div className="kpi-card">
        <div className="kpi-card-header">
            {icon && <span className="kpi-card-icon">{icon}</span>}
            <span className="kpi-card-title">{title}</span>
        </div>
        <div className="kpi-card-value">{value}</div>
        {footer && <div className="kpi-card-footer">{footer}</div>}
    </div>
);

KpiCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.node,
    footer: PropTypes.node,
};

export default KpiCard;