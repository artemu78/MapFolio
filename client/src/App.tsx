import { FallbackTechMap } from './components/FallbackTechMap';

// An example array of technologies for a project.
const projectTechStack = [
  'TypeScript',
  'AWS',
  'Firebase',
  'React Router',
  'Zustand'
];

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      <FallbackTechMap technologies={projectTechStack} />
    </div>
  );
}

export default App;
