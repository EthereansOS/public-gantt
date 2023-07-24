var GanttViewerController = function(view) {
    var context = this;
    context.view = view;

    var baseURL = window.location.port === '5500' ? 'http://127.0.0.1:5500' : 'https://raw.githubusercontent.com/EthereansOS/public-gantt/gh-pages';

    context.refreshGantt = async function refreshGantt(ref) {
        if(!ref) {
            return;
        }
        var data = await (await fetch(`${baseURL}/data/gantt.json`)).json();
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