
import React, { useState } from 'react';
import Card from '../../../components/card';
import Approved from '../../../components/approved';
import Form from '../../../components/form';
import MissionRequestForm from '../../../../app/Process/Missions/moduleComponents/MissionRequestForm/MissionRequestForm';
import MissionsDataTable from '../../../../app/Process/Missions/moduleComponents/MissionsDataTable/MissionsDataTable';
import MissionsCardView from '../../../../app/Process/Missions/moduleComponents/MissionsCardView';
import MissionsAnalysisPage from '../../../../app/Process/Missions/moduleComponents/MissionsAnalysis/MissionsAnalysisPage';
import PowerBIAnalysisPage from '../../../../app/Process/Missions/moduleComponents/PowerBIAnalysisPage';
import EventRequestForm from '../../../../app/Events/moduleComponents/EventRequestForm';
import EventRequestList from '../../../../app/Events/moduleComponents/EventRequestList';
import EventValidationPanel from '../../../../app/Events/moduleComponents/EventValidationPanel';
import EventStatusManager from '../../../../app/Events/moduleComponents/EventStatusManager';
import ApprovedEventsList from '../../../../app/Events/moduleComponents/ApprovedEventsList';


export const getServicesConfig = () => ({
  "Missions and Travel": [
    { 
      name: "Booking Form", 
      component: <MissionRequestForm/>,
      description: "Book flights, accommodations, and transportation"
    },
    { 
      name: "Requests", 
      component: <MissionsDataTable/>,
      description: "Request help with visa applications and processing"
    },
    { 
      name: "Reports", 
      component: <MissionsCardView />,
      description: "Submit travel expenses for reimbursement"
    },
    { 
      name: "BI Dashboard", 
      component: <PowerBIAnalysisPage />,
      description: "Submit travel expenses for reimbursement"
    },
    { 
      name: "Analysis", 
      component: <MissionsAnalysisPage/>,
      description: "Request and track mission approvals"
    }
  ],
  "Access": [
    { 
      name: "Access Demand", 
      component: <Form formType="access" />,
      description: "Submit a new access request for yourself or guests"
    },
    { 
      name: "Pending Demands", 
      component: <Card status="pending" type="access" />,
      description: "View and track your pending access requests"
    },
    { 
      name: "Visitor Passes", 
      component: <Form formType="visitor" />,
      description: "Request temporary passes for visitors and guests"
    },
    { 
      name: "Conference Room Booking", 
      component: <Form formType="conference" />,
      description: "Book meeting spaces and conference rooms"
    }
  ],
  "Housing": [
    { 
      name: "Staff Accommodation", 
      component: <Form formType="staff-housing" />,
      description: "Apply for long-term staff accommodation"
    },
    { 
      name: "Temporary Housing", 
      component: <Form formType="temp-housing" />,
      description: "Request short-term temporary housing"
    },
    { 
      name: "Housing Allowance", 
      component: <Approved type="allowance" />,
      description: "Submit housing allowance requests and documentation"
    },
    { 
      name: "Maintenance Requests", 
      component: <Form formType="maintenance" />,
      description: "Report issues and request maintenance for your accommodation"
    }
  ],
  "Catering": [
    { 
      name: "Event Catering", 
      component: <Form formType="event-catering" />,
      description: "Order catering services for events and meetings"
    },
    { 
      name: "Daily Meal Services", 
      component: <Card status="active" type="meal" />,
      description: "View and modify your daily meal plan"
    },
    { 
      name: "Special Dietary Requests", 
      component: <Form formType="dietary" />,
      description: "Submit special dietary requirements and restrictions"
    },
    { 
      name: "Cafeteria Services", 
      component: <Card status="info" type="cafeteria" />,
      description: "View cafeteria hours, menus, and information"
    }
  ],
  "Events": [
    { 
      name: "Event Request", 
      component: <EventRequestForm />, 
      description: "Soumettre une nouvelle demande d'événement"
    },
    { 
      name: "My Requests", 
      component: <EventRequestList />, 
      description: "Suivre vos demandes d'événement"
    },
    { 
      name: "Validation Panel", 
      component: <EventValidationPanel />, 
      description: "Examiner et traiter les demandes en attente"
    },
    { 
      name: "Status Manager", 
      component: <EventStatusManager />, 
      description: "Mettre à jour le statut des événements validés"
    },
    { 
      name: "Approved Events", 
      component: <ApprovedEventsList />, 
      description: "Consulter les événements validés"
    }
  ]
});
