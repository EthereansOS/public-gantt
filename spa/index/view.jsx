var Index = React.createClass({
    requiredModules: [
        'spa/ganttViewer'
    ],
    render() {
        return (<>
            <header className="w3-container w3-teal">
                <h1>The Gantt</h1>
            </header>
            <div className="w3-container">
                <p>
                    This page will be filled with all the info about the progress of the protocol.
                    Don't expect to see any ETA, it's just to show progresses.
                    It will be always updated with news and progresses that can change in time.
                    But this is a public GitHub repo, so everyone can always check the commits, in order to see what is changed and why.
                </p>
            </div>
            <div className="w3-container">
                <GanttViewer/>
            </div>
        </>
        );
    }
});