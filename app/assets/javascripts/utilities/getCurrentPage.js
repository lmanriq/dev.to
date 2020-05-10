

// we'll want to use this to get to /dashboard/user_stats

function getCurrentPage(classString) {
  return (
    document.querySelectorAll("[data-current-page='" + classString + "']")
      .length > 0
  );
}
