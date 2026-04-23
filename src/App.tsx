import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import RecordScreen from './screens/RecordScreen';
import ProcessingScreen from './screens/ProcessingScreen';
import ScopeReviewScreen from './screens/ScopeReviewScreen';
import EstimateScreen from './screens/EstimateScreen';
import ClaimPackageScreen from './screens/ClaimPackageScreen';
import NavBar from './components/NavBar';

export type Screen = 'record' | 'processing' | 'review' | 'estimate' | 'package';

export default function App() {
  const [screen, setScreen] = useState<Screen>('record');

  return (
    <div className="min-h-screen bg-ink-50 noise">
      <NavBar current={screen} onNavigate={setScreen} />

      <main className="relative">
        <AnimatePresence mode="wait">
          {screen === 'record' && (
            <RecordScreen key="record" onComplete={() => setScreen('processing')} />
          )}
          {screen === 'processing' && (
            <ProcessingScreen key="processing" onComplete={() => setScreen('review')} />
          )}
          {screen === 'review' && (
            <ScopeReviewScreen key="review" onNext={() => setScreen('estimate')} />
          )}
          {screen === 'estimate' && (
            <EstimateScreen key="estimate" onNext={() => setScreen('package')} />
          )}
          {screen === 'package' && (
            <ClaimPackageScreen key="package" onRestart={() => setScreen('record')} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
