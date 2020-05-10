import initCharts from '../analytics/dashboard';

function initDashboard() {
  const activeOrg = document.querySelector('.organization.active');
  // sets the organixation ID for the users organization if present, doesn't initialize the charts with an article ID 
  if (activeOrg) {
    initCharts({ organizationId: activeOrg.dataset.organizationId });
  } else {
    initCharts({ organizationId: null });
  }
}

window.InstantClick.on('change', () => {
  initDashboard();
});

initDashboard();
