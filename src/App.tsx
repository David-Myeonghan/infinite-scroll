import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import ObserverRebuild from './pages/ObserverRebuild';
import StableObserver from './pages/StableObserver';

function Home() {
	return (
		<>
			<h1>Infinite Scroll Playground</h1>
			<p>같은 무한스크롤을 두 가지 방식으로 구현 — 비교용.</p>
			<ul>
				<li>
					<Link to="/stable">Stable Observer</Link> — observer 1번 등록, fetch
					분리
				</li>
				<li>
					<Link to="/rebuild">Observer Rebuild</Link> — useCallback chain,
					observer 매 페이지 재생성
				</li>
			</ul>
		</>
	);
}

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<nav style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
				<Link to="/">Home</Link> {' | '}
				<Link to="/stable">Stable</Link> {' | '}
				<Link to="/rebuild">Rebuild</Link>
			</nav>
			<main style={{ padding: 16 }}>{children}</main>
		</>
	);
}

function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/stable" element={<StableObserver />} />
				<Route path="/rebuild" element={<ObserverRebuild />} />
			</Routes>
		</Layout>
	);
}

export default App;
