var GanttViewerController = function(view) {
    var context = this;
    context.view = view;

    context.refreshGantt = async function refreshGantt(ref) {
        if(!ref) {
            return;
        }
        var data = await window.AJAXRequest('data/gantt.json');
        (new Gantt("ganttChart", {
            sidebarHeader: "Unused right now",
            noDataFoundMessage: "No data found",
            startTimeAlias: "start",
            endTimeAlias: "end",
            idAlias: "recordID",
            rowAlias: "row",
            linkAlias: "urls",
            tooltipAlias: "tooltip",
            refreshFunction: () => data
        })).refreshData();
        [...ref.getElementsByTagName('a')].forEach(a => a.href = "#");
    };
};