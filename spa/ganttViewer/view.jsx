var GanttViewer = React.createClass({
    requiredScripts: [
        'assets/plugins/gantt/gantt.min.css',
        'assets/plugins/gantt/gantt.min.js',
        'assets/plugins/showdown/showdown.min.js'
    ],
    render() {
        return (<div id="ganttChart" ref={this.controller.refreshGantt}></div>);
    }
});