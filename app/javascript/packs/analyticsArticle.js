import initCharts from '../analytics/dashboard';

// initializes the charts for the dashboard article using the exported function from the dashboard.js file
function initDashboardArticle() {
  const article = document.getElementById('article');
  const { articleId, organizationId } = article.dataset;
  initCharts({ articleId, organizationId });
}

window.InstantClick.on('change', () => {
  initDashboardArticle();
});

initDashboardArticle();
