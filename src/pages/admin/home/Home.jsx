import React, { useState } from 'react';
import './Home.css';

import Publishcontent from '../publish-content/Publishcontent';
import Notification from '../notification/Notification';
import EditContent from '../edit-content/EditContent';
import EditMedia from '../edit-media/EditMedia';
import WhatsNew from '../edit-whatsnew/Editnew';

function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <>
      <div className="sidebar flex-column pt-3 bg-primary">
        <button className="nav-link" onClick={() => setActiveTab('dashboard')}>
          <i className="fas fa-upload"></i>
          <span className='fw-bold'>Publish Pages</span>
        </button>
      </div>

      <div className="main">
        {activeTab === 'dashboard' && <Publishcontent setActiveTab={setActiveTab} />}
        {activeTab === 'edit-content' && <EditContent />}
        {activeTab === 'edit-media' && <EditMedia />}
        {activeTab === 'notification' && <Notification />}
        {activeTab === 'Whats-NEW' && <WhatsNew />}
      </div>
    </>
  );
}

export default Admin;
