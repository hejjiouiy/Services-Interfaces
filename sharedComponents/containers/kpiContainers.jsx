import React from 'react';
import KpiCard from '../componenets/kpiCard';

// Container for KPI-related components
const KpiContainer = ({ className = '', ...props }) => (
    <div className={`kpi-container ${className}`} {...props}>
        props.kpiList.map{((kpi, index) => (
            <KpiCard
                key={index}
                title={kpi.title}
                value={kpi.value}
                icon={kpi.icon}
                footer={kpi.footer}
            />
        ))}
        {/* Example of a single KpiCard usage */}
    </div>
);

export default KpiContainer;