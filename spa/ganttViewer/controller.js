var GanttViewerController = function(view) {
    var context = this;
    context.view = view;

    var baseURL = window.location.port === '5500' ? 'http://127.0.0.1:5500' : 'https://raw.githubusercontent.com/EthereansOS/public-gantt/gh-pages';

    context.refreshGantt = async function refreshGantt(ref) {
        var data = await context.retrieveData();
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
        [...ref.getElementsByTagName('a')].forEach((a, i) => {
            a.href = "#";
            a.style.backgroundColor = "#" + data[i].backgroundColor;
            if(!data[i].started) {
                a.style.opacity = 0.3;
                a.innerHTML = `<i class="fa fa-hourglass" aria-hidden="true" style="float: right; margin-top: 10px; margin-right: -5px; font-size: 15px;"></i>`
            } else if(!data[i].completed) {
                a.style.opacity = 0.5;
                a.innerHTML = `<i class="fa fa-play" aria-hidden="true" style="float: right; margin-top: 10px; margin-right: -5px; font-size: 10px;"></i>`
            } else {
                a.innerHTML = `<i class="fa fa-check" aria-hidden="true" style="float: right; margin-top: 10px; margin-right: -5px; font-size: 20px; color: darkgreen;"></i>`
            }
        });
        return data;
    };

    context.retrieveData = async function retrieveData() {

        var taskInterval = 300000;
        var taskDuration = 1800000;
        var rawDataArray = await (await fetch(`${baseURL}/data/timeline.json`)).json();

        var data = [];

        var date = (new Date().getTime()) - taskInterval;

        var globalRecordID = 1;
        var recordIDs = {};

        for(var rawData of rawDataArray) {
            var originalData = (recordIDs[rawData.codeName] = recordIDs[rawData.codeName] || {...rawData, recordID : globalRecordID++, backgroundColor : window.web3.utils.sha3(rawData.codeName).substring(10, 16)});
            data.push({
                recordID : originalData.recordID,
                row : originalData.name,
                tooltip : await context.getTooltip(rawData, originalData),
                start : new Date(date += taskInterval).toString(),
                end : new Date(date += taskDuration).toString(),
                backgroundColor : originalData.backgroundColor,
                started : rawData.started,
                completed : rawData.completed
            });
        }

        return data;
    }

    context.getTooltip = async function getTooltip(rawData, originalData) {
        var description = rawData.description;
        if(!description && (rawData.descriptionLink || originalData.descriptionLink)) {
            description = await (await fetch(baseURL + '/data/descriptions/' + (rawData.descriptionLink || originalData.descriptionLink))).text();
            description = (new showdown.Converter()).makeHtml(description);
        }

        description = `<p><b>${originalData.name}</b></p><p>${description || originalData.description || ""}</p>`;

        if(rawData.started) {
            description += `<p>Started: ${rawData.started}${rawData.completed ? ` - Completed: ${rawData.completed}` : ""}</p>`;
        }

        return description;
    }
};