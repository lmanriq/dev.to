import initCharts from '../analytics/dashboard';

// May use- sets an id for user's organization if one exists. Not quite sure what is happening here, but involved in chart initiialization
function initDashboard() {
  const activeOrg = document.querySelector('.organization.active');
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
