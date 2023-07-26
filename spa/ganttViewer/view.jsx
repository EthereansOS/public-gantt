var GanttViewer = React.createClass({
    requiredScripts: [
        'assets/plugins/gantt/gantt.min.css',
        'assets/plugins/gantt/gantt.min.js',
        'assets/plugins/showdown/showdown.min.js'
    ],
    render() {
        return (<div id="ganttChart" ref={ref => ref && ref.children.length === 0 && this.controller.refreshGantt(ref).then(this.props.onData)}></div>);
    }
});