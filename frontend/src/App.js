// import ParticipantRegistration from './componants/ParticipantRegistration';
// import CollegeChecking from './componants/CollegeChecking'
import './App.css';
import Login from './componants/Login';
import OrganizerRegistration from './componants/OrganizerRegistration';
import ParticipantRegistration from './componants/ParticipantRegistration';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ParticipantRegistration />
        {/* <CollegeChecking /> */}
        <OrganizerRegistration />
        <Login />
        
      </header>
    </div>
  );
}

export default App;
