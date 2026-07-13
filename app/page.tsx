import { Card } from 'antd';
import { Dashboard } from '../components/dashboard';
import { LoginForm } from '../components/login-form';

export default function Home() {
  return <div className="shell"><header><div className="brand">Zero Trust Networks</div><span>Secure management plane</span></header><main className="dashboard-grid"><Dashboard /><Card title="Access portal"><p>Verify your identity before accessing protected services.</p><LoginForm /></Card></main></div>;
}
