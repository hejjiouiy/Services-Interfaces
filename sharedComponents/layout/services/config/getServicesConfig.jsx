
import React, { useState } from 'react';
import Card from '../../../components/card';
import Form from '../../../components/form';
import MissionRequestForm from '../../../../app/Process/Missions/moduleComponents/MissionRequestForm/MissionRequestForm';
import MissionsDataTable from '../../../../app/Process/Missions/moduleComponents/MissionsDataTable/MissionsDataTable';
import MissionsCardView from '../../../../app/Process/Missions/moduleComponents/MissionsCardView';
import MissionsAnalysisPage from '../../../../app/Process/Missions/moduleComponents/MissionsAnalysis/MissionsAnalysisPage';
import PowerBIAnalysisPage from '../../../../app/Process/Missions/moduleComponents/PowerBIAnalysisPage';
import HousingRequestForm from '../../../../app/Process/Housing/moduleComponents/HousingRequestForm';
import HousingRequestList from '../../../../app/Process/Housing/moduleComponents/HousingRequestList';
import HousingValidationPanel from '../../../../app/Process/Housing/moduleComponents/HousingValidationPanel';
import HousingAssignmentPanel from '../../../../app/Process/Housing/moduleComponents/HousingAssignmentPanel';
import HousingGuestManager from '../../../../app/Process/Housing/moduleComponents/HousingGuestManager';
import CateringRequestForm from '../../../../app/Process/Catering/moduleComponents/CateringRequestForm';
import CateringRequestList from '../../../../app/Process/Catering/moduleComponents/CateringRequestList';
import CateringRequestManager from '../../../../app/Process/Catering/moduleComponents/CateringRequestManager';




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
    // { 
    //   name: "Reports", 
    //   component: <MissionsCardView />,
    //   description: "Submit travel expenses for reimbursement"
    // },
    // { 
    //   name: "BI Dashboard", 
    //   component: <PowerBIAnalysisPage />,
    //   description: "Submit travel expenses for reimbursement"
    // },
    { 
      name: "Analysis", 
      component: <MissionsAnalysisPage/>,
      description: "Request and track mission approvals"
    }
  ],
  // "Access": [
  //   { 
  //     name: "Access Demand", 
  //     component: <Form formType="access" />,
  //     description: "Submit a new access request for yourself or guests"
  //   },
  //   { 
  //     name: "Pending Demands", 
  //     component: <Card status="pending" type="access" />,
  //     description: "View and track your pending access requests"
  //   },
  //   { 
  //     name: "Visitor Passes", 
  //     component: <Form formType="visitor" />,
  //     description: "Request temporary passes for visitors and guests"
  //   },
  //   { 
  //     name: "Conference Room Booking", 
  //     component: <Form formType="conference" />,
  //     description: "Book meeting spaces and conference rooms"
  //   }
  // ],
  // "Housing": [
  //   {
  //     name: "Submit Request",
  //     component: <HousingRequestForm />,
  //     description: "Submit a new accommodation request for yourself or guests"
  //   },
  //   {
  //     name: "My Requests",
  //     component: <HousingRequestList />,
  //     description: "View and track your accommodation requests"
  //   },
  //   {
  //     name: "Validation",
  //     component: <HousingValidationPanel />,
  //     description: "Review, validate or reject submitted requests"
  //   },
  //   {
  //     name: "Assignment & Budget",
  //     component: <HousingAssignmentPanel />,
  //     description: "Assign accommodation and link a budget line"
  //   },
  //   {
  //     name: "Guest Management",
  //     component: <HousingGuestManager />,
  //     description: "Manage guests and their reservation requests"
  //   }
  // ],
  // "Catering": [
  //   { 
  //     name: "Catering Request", 
  //     component: <CateringRequestForm />,
  //     description: "Order catering services for events and meetings"
  //   },
  //   { 
  //     name: "My Requests", 
  //     component: <CateringRequestList />,
  //     description: "View and modify your daily meal plan"
  //   },
  //   { 
  //     name: "Requests Management - edit", 
  //     component: <CateringRequestManager />,
  //     description: "View cafeteria hours, menus, and information"
  //   }
  // ],
});
