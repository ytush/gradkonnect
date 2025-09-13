import React, { useState } from 'react';
import { AuroraHero } from './components/ui/futurastic-hero-section';
import { DemoSignIn } from './components/DemoSignIn';

function App() {
    const [appStarted, setAppStarted] = useState(false);

    const handleStartTrial = () => {
        setAppStarted(true);
    };

    if (appStarted) {
        return <DemoSignIn />;
    }

    return (
        <AuroraHero onStartTrial={handleStartTrial} />
    );
}

export default App;
