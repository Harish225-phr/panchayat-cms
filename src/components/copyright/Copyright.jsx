import React, { useState, useEffect } from 'react'
import './Copyright.css';
function Copyright() {

   const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const iso = localStorage.getItem('whatsNewLastUpdated');
    if (iso) {
      try {
        const d = new Date(iso);
        if (!isNaN(d)) {
          // format as "08 Sep 2025, 11:21 AM" (adjust to your locale if needed)
          const formatted = d.toLocaleString(undefined, {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
          setLastUpdated(formatted);
        }
      } catch (e) { /* ignore parse errors */ }
    }
  }, []);
  return (
    <footer>
    <p class="p-1">
      Copyright <b>PANCHAYATI RAJ DEPARTMENT.</b> Designed & developed by department of Digital
      Technologies and Governance, GoHP. All Rights Reserved.
    <p class="p-1 custom-style">Last Updated On : {lastUpdated || '—'}</p>
    </p>
  </footer>
  )
}

export default Copyright