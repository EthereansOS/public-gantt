var Index = React.createClass({
    requiredModules: [
        'spa/ganttViewer'
    ],
    render() {

        var [data, setData] = useState(null, "data");

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
                <GanttViewer onData={setData}/>
            </div>
            <div className="w3-container">
                <h5>Legend:</h5>
                <ul>
                    <li><i class="fa fa-hourglass" aria-hidden="true"/>{'\u00a0'}<span>Task enqueued</span></li>
                    <li><i class="fa fa-play" aria-hidden="true"/>{'\u00a0'}<span>Task started</span></li>
                    <li><i class="fa fa-check" aria-hidden="true"/>{'\u00a0'}<span>Task done</span></li>
                </ul>
            </div>
            {data && <div className="w3-container">
                <h5>Tasks:</h5>
                <ul>
                    {data.map((element, i) => <li className='task' key={element.recordID + '_' + i} ref={ref => ref && (ref.innerHTML = element.tooltip)}></li>)}
                </ul>
            </div>}
        </>
        );
    }
});