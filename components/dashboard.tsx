'use client';

import { Alert, Card, Col, Row, Skeleton, Statistic, Tag, Typography } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../lib/auth';
import { getDashboard } from '../lib/api';

const fallback = { activeUsers: 0, registeredDevices: 0, protectedResources: 0, openAlerts: 0, averageTrustScore: 0 };
export function Dashboard() {
  const { session } = useAuth();
  const { data, error, isLoading } = useQuery({ queryKey: ['dashboard', session?.accessToken], queryFn: () => getDashboard(session!.accessToken), enabled: Boolean(session), retry: false });
  const metrics = data ?? fallback;
  const cards = [['Active identities', metrics.activeUsers], ['Trusted devices', metrics.registeredDevices], ['Protected resources', metrics.protectedResources], ['Open alerts', metrics.openAlerts]];
  return <section><div className="section-heading"><div><Typography.Title level={2}>Security overview</Typography.Title><Typography.Text type="secondary">Continuous verification across identities, devices, and resources.</Typography.Text></div><Tag color={session ? 'success' : 'default'}>{session ? 'Authenticated' : 'Sign in required'}</Tag></div>
    {!session && <Alert className="api-alert" type="info" showIcon message="Sign in to view live data" description="The dashboard is protected by your Zero Trust session." />}
    {error && <Alert className="api-alert" type="warning" showIcon message="Live API data unavailable" description={(error as Error).message} />}
    <Row gutter={[16, 16]}>{cards.map(([label, value]) => <Col xs={24} sm={12} xl={6} key={String(label)}><Card>{isLoading ? <Skeleton active paragraph={{ rows: 1 }} /> : <Statistic title={label} value={Number(value)} />}</Card></Col>)}</Row>
    <Card className="trust-card" title="Average trust score"><Statistic value={metrics.averageTrustScore} suffix="/ 100" valueStyle={{ color: metrics.averageTrustScore >= 70 ? '#0f766e' : '#c2410c' }} /><Typography.Paragraph type="secondary">Trust is recalculated per access request from identity, authentication, device, behavior, and context signals.</Typography.Paragraph></Card>
  </section>;
}
